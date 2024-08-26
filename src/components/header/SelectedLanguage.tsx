import React from "react";
import { atom, useRecoilState } from "recoil";

export const SelectedLanguageState = atom<string>({
  key: "selectedLanguageStateKey",
  default: "az",
});

const SelectedLanguage: React.FC = () => {
  const [activeLang, setActiveLang] = useRecoilState(SelectedLanguageState);

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "az";
    if (savedLanguage) {
      setActiveLang(savedLanguage);
    }
  }, [setActiveLang]);

  const handleSelectLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    setActiveLang(lang);
  };

  return (
    <div className="languages">
      <article className={`az ${activeLang === "az" ? "active-lang" : ""}`} onClick={() => handleSelectLanguage("az")}>
        <span>az</span>
      </article>
      {/* <article className={`ru ${activeLang === "ru" ? "active-lang" : ""}`} onClick={() => handleSelectLanguage("ru")}>
        <span>ru</span>
      </article> */}
    </div>
  );
};

export default SelectedLanguage;
