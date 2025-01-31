import { Platform } from 'react-native';
import Sound from 'react-native-sound';

type SoundKeys = 'app' | 'tap' | 'game_over' | 'splash' | 'win' | 'draw';

class SoundService {
  static sounds: Partial<Record<SoundKeys, Sound>> = {};

  static loadSounds(): void {
    const soundFiles: Record<SoundKeys, any> = {
      app: require('./assets/audio/app.mp3'),
      tap: require('./assets/audio/press.mp3'),
      game_over: require('./assets/audio/robotic_game_over.mp3'),
      splash: require('./assets/audio/splash.mp3'),
      win: require('./assets/audio/win.mp3'),
      draw: require('./assets/audio/draw.mp3'),
    };

    Sound.setCategory('Playback'); // Ensure proper playback

    Object.entries(soundFiles).forEach(([key, file]) => {
      const soundKey = key as SoundKeys;
      this.sounds[soundKey] = new Sound(
        file,
        Platform.OS === 'ios' ? Sound.MAIN_BUNDLE : undefined,
        (error) => {
          if (error) {
            console.log(`Error loading ${soundKey}:`, error);
            delete this.sounds[soundKey]; // Remove faulty sound to avoid null issues
          }
        }
      );
    });
  }

  static playSound(soundKey: SoundKeys): void {
    const sound = this.sounds[soundKey];
    if (sound) {
      sound.stop(() => sound.play());
    } else {
      console.warn(`Sound ${soundKey} not found or not loaded!`);
    }
  }

  static unloadSounds(): void {
    Object.values(this.sounds).forEach((sound) => sound?.release());
    this.sounds = {};
  }
}

export default SoundService;
