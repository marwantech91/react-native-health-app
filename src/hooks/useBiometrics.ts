import { useState, useEffect, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export type BiometryType = 'fingerprint' | 'facial' | 'iris' | 'none';

/**
 * Custom hook for biometric authentication
 * Supports Face ID, Touch ID, and Fingerprint
 */
export function useBiometrics() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [biometryType, setBiometryType] = useState<BiometryType>('none');
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    try {
      // Check if hardware supports biometrics
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsAvailable(compatible);

      if (compatible) {
        // Check if user has enrolled biometrics
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setIsEnrolled(enrolled);

        // Get biometry type
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setBiometryType('facial');
        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setBiometryType('fingerprint');
        } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
          setBiometryType('iris');
        }
      }
    } catch (error) {
      console.error('Error checking biometrics:', error);
    }
  };

  const authenticate = useCallback(async (
    options?: { promptMessage?: string; cancelLabel?: string }
  ): Promise<boolean> => {
    if (!isAvailable || !isEnrolled) {
      return false;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: options?.promptMessage || 'Authenticate to continue',
        cancelLabel: options?.cancelLabel || 'Cancel',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  }, [isAvailable, isEnrolled]);

  const getBiometryName = useCallback((): string => {
    switch (biometryType) {
      case 'facial':
        return 'Face ID';
      case 'fingerprint':
        return 'Touch ID';
      case 'iris':
        return 'Iris Scan';
      default:
        return 'Biometrics';
    }
  }, [biometryType]);

  return {
    isAvailable,
    isEnrolled,
    biometryType,
    authenticate,
    getBiometryName,
    checkBiometrics,
  };
}
