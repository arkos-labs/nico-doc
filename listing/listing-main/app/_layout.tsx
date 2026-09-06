import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { CoursesProvider } from '@/context/CoursesContext';
import { ReferenceProvider } from '@/context/ReferenceContext';
import { FuelProvider } from '@/context/FuelContext';
import { MotoProvider } from '@/context/MotoContext';
import { ClosuresProvider } from '@/context/ClosuresContext';
import { GoalProvider } from '@/context/GoalContext';
import { WorkProvider } from '@/context/WorkContext';
import { KmProvider } from '@/context/KmContext';
import { MaintenanceProvider } from '@/context/MaintenanceContext';
import { SyncProvider } from '@/context/SyncContext';
import { RealtimeToast } from '@/components/RealtimeToast';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Forcer le meta viewport pour bloquer le zoom
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      (viewport as HTMLMetaElement).name = 'viewport';
      document.head.appendChild(viewport);
    }
    (viewport as HTMLMetaElement).content =
      'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no';

    const blockPinch = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    let lastTap = 0;
    const blockDoubleTap = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTap < 300) e.preventDefault();
      lastTap = now;
    };
    const blockGesture = (e: Event) => e.preventDefault();

    document.addEventListener('touchmove', blockPinch, { passive: false });
    document.addEventListener('touchend', blockDoubleTap, { passive: false });
    document.addEventListener('gesturestart', blockGesture);
    document.addEventListener('gesturechange', blockGesture);
    document.addEventListener('gestureend', blockGesture);

    return () => {
      document.removeEventListener('touchmove', blockPinch);
      document.removeEventListener('touchend', blockDoubleTap);
      document.removeEventListener('gesturestart', blockGesture);
      document.removeEventListener('gesturechange', blockGesture);
      document.removeEventListener('gestureend', blockGesture);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <CoursesProvider>
            <ReferenceProvider>
              <FuelProvider>
                <MotoProvider>
                  <ClosuresProvider>
                    <GoalProvider>
                      <WorkProvider>
                        <KmProvider>
                          <MaintenanceProvider>
                            <SyncProvider>
                              <ThemedApp />
                              <RealtimeToast />
                            </SyncProvider>
                          </MaintenanceProvider>
                        </KmProvider>
                      </WorkProvider>
                    </GoalProvider>
                  </ClosuresProvider>
                </MotoProvider>
              </FuelProvider>
            </ReferenceProvider>
          </CoursesProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function ThemedApp() {
  const { isDark } = useTheme();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="reset-password" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}
