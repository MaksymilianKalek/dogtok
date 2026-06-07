import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('pl') ? 'en' : 'pl';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button 
      className="lang-switcher" 
      onClick={toggleLanguage}
      data-hover
      aria-label="Toggle language"
    >
      <span className={i18n.language.startsWith('pl') ? 'active' : ''}>PL</span>
      <span className="separator">/</span>
      <span className={i18n.language.startsWith('en') ? 'active' : ''}>EN</span>
    </button>
  );
}
