document.addEventListener('DOMContentLoaded', function () {
    const loadedLanguages = { en: true };
  
    i18next.init({
      lng: 'en',
      fallbackLng: 'en',
      resources: {
        en: {}
      }
    });
  
    document.querySelectorAll('.lang-switch').forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault(); // Stop link behavior
        const targetLang = this.getAttribute('data-lang');
  
        document.querySelectorAll('.lang-switch').forEach(btn => {
          btn.classList.remove('active');
        });
        this.classList.add('active');
  
        if (targetLang === 'en') {
          restoreOriginalText();
          document.documentElement.setAttribute('lang', 'en');
          return;
        }
  
        if (!loadedLanguages[targetLang]) {
          fetch(`./locales/${targetLang}/translation.json`)
            .then(res => {
              if (!res.ok) throw new Error('Translation not found');
              return res.json();
            })
            .then(resources => {
              storeOriginalText();
              i18next.addResourceBundle(targetLang, 'translation', resources);
              loadedLanguages[targetLang] = true;
              i18next.changeLanguage(targetLang, () => {
                applyTranslation();
              });
            })
            .catch(err => {
              console.error('Error loading translation:', err);
              alert(`Could not load ${targetLang} translation.`);
            });
        } else {
          i18next.changeLanguage(targetLang, () => {
            applyTranslation();
          });
        }
      });
    });
  
    let originalTextStored = false;
  
    function storeOriginalText() {
      if (originalTextStored) return;
      document.querySelectorAll('[data-i18n]').forEach(el => {
        if (!el.hasAttribute('data-original-text')) {
          el.setAttribute('data-original-text', el.textContent.trim());
        }
      });
      originalTextStored = true;
    }
  
    function restoreOriginalText() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        if (el.hasAttribute('data-original-text')) {
          el.textContent = el.getAttribute('data-original-text');
        }
      });
    }
  
    function applyTranslation() {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = i18next.t(key);
        if (translated && translated !== key) {
          el.textContent = translated;
        }
      });
    }
  });
  