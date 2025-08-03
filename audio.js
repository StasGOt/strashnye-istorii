// Аудио функционал для страниц
class AudioManager {
    constructor() {
        this.audioToggle = document.getElementById('audio-toggle');
        this.bgMusic = document.getElementById('bg-music');
        this.hoverSfx = document.getElementById('hover-sfx');
        this.musicPlaying = false;
        // По умолчанию аудио выключено, включается только когда пользователь явно включит
        this.audioEnabled = localStorage.getItem('audioEnabled') === 'true';
        this.audioLoaded = false;
        
        this.init();
    }

    init() {
        if (!this.audioToggle || !this.bgMusic || !this.hoverSfx) {
            console.warn('Аудио элементы не найдены');
            return;
        }

        // Настройка громкости
        this.bgMusic.volume = 0.3;
        this.hoverSfx.volume = 0.2;

        // Обработчики событий
        this.bgMusic.addEventListener('canplaythrough', () => {
            this.audioLoaded = true;
            this.updateAudioButton();
            // Восстанавливаем состояние музыки если она была включена
            this.restoreMusicState();
        });

        this.bgMusic.addEventListener('error', (e) => {
            console.warn('Ошибка загрузки фоновой музыки:', e);
            this.audioToggle.textContent = '❌';
            this.audioToggle.title = 'Ошибка загрузки аудио';
        });

        this.hoverSfx.addEventListener('error', (e) => {
            console.warn('Ошибка загрузки звукового эффекта:', e);
        });

        this.audioToggle.addEventListener('click', () => this.toggleAudio());

        // Сохраняем состояние музыки при уходе со страницы
        window.addEventListener('beforeunload', () => {
            if (this.musicPlaying) {
                localStorage.setItem('musicPlaying', 'true');
                localStorage.setItem('audioEnabled', 'true');
            } else {
                localStorage.setItem('musicPlaying', 'false');
                localStorage.setItem('audioEnabled', this.audioEnabled.toString());
            }
        });

        // Обработка переключения вкладок
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Страница скрыта - сохраняем состояние
                localStorage.setItem('musicPlaying', this.musicPlaying.toString());
                localStorage.setItem('audioEnabled', this.audioEnabled.toString());
            } else {
                // Страница снова видна - восстанавливаем состояние
                const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
                const wasEnabled = localStorage.getItem('audioEnabled') === 'true';
                if (wasPlaying && wasEnabled && this.audioLoaded && !this.musicPlaying) {
                    this.bgMusic.play().then(() => {
                        this.musicPlaying = true;
                        this.audioEnabled = true;
                        this.updateAudioButton();
                    }).catch(() => {
                        // Если не удалось автоматически, пробуем после первого клика
                        document.addEventListener('click', () => {
                            if (this.audioEnabled && !this.musicPlaying && this.audioLoaded) {
                                this.bgMusic.play().then(() => {
                                    this.musicPlaying = true;
                                    this.updateAudioButton();
                                }).catch(() => {});
                            }
                        }, { once: true });
                    });
                }
            }
        });

        // Убираем автовоспроизведение - музыка включается только по желанию пользователя
        this.updateAudioButton();
    }

    updateAudioButton() {
        if (!this.audioLoaded) {
            this.audioToggle.textContent = '⏳';
            this.audioToggle.title = 'Загрузка аудио...';
            return;
        }
        this.audioToggle.textContent = this.musicPlaying ? '🔊' : '🔈';
        this.audioToggle.title = this.musicPlaying ? 'Выключить музыку' : 'Включить музыку';
    }

    // Восстановление состояния музыки при загрузке страницы
    restoreMusicState() {
        if (this.audioEnabled && !this.musicPlaying) {
            // Проверяем, была ли музыка включена в localStorage
            const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
            if (wasPlaying) {
                this.bgMusic.play().then(() => {
                    this.musicPlaying = true;
                    this.updateAudioButton();
                }).catch((error) => {
                    console.log('Не удалось восстановить воспроизведение:', error);
                    // Если не удалось автоматически, пробуем после первого клика
                    document.addEventListener('click', () => {
                        if (this.audioEnabled && !this.musicPlaying && this.audioLoaded) {
                            this.bgMusic.play().then(() => {
                                this.musicPlaying = true;
                                this.updateAudioButton();
                            }).catch(() => {});
                        }
                    }, { once: true });
                });
            }
        }
    }

    async toggleAudio() {
        if (!this.audioLoaded) {
            alert('Аудио ещё загружается. Попробуйте позже.');
            return;
        }

        try {
            if (this.musicPlaying) {
                this.bgMusic.pause();
                this.musicPlaying = false;
                this.audioEnabled = false;
                localStorage.setItem('musicPlaying', 'false');
                localStorage.setItem('audioEnabled', 'false');
            } else {
                const playPromise = this.bgMusic.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    this.musicPlaying = true;
                    this.audioEnabled = true;
                    localStorage.setItem('musicPlaying', 'true');
                    localStorage.setItem('audioEnabled', 'true');
                }
            }
            this.updateAudioButton();
        } catch (error) {
            console.warn('Не удалось воспроизвести аудио:', error);
            if (error.name === 'NotAllowedError') {
                alert('Браузер заблокировал автовоспроизведение. Нажмите кнопку ещё раз после взаимодействия со страницей.');
            } else {
                alert('Ошибка воспроизведения аудио. Проверьте настройки браузера.');
            }
        }
    }

    playHoverSound() {
        // Звук наведения играет только если аудио включено
        if (this.audioEnabled && this.audioLoaded) {
            this.hoverSfx.currentTime = 0;
            this.hoverSfx.play().catch(() => {});
        }
    }

    // Новый метод для звука клика
    playClickSound() {
        if (this.audioEnabled && this.audioLoaded) {
            this.hoverSfx.currentTime = 0;
            this.hoverSfx.play().catch(() => {});
        }
    }
}

// Глобальные функции для воспроизведения звуков
window.playHoverSound = function() {
    if (window.audioManager) {
        window.audioManager.playHoverSound();
    }
};

window.playClickSound = function() {
    if (window.audioManager) {
        window.audioManager.playClickSound();
    }
};

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    window.audioManager = new AudioManager();
}); 