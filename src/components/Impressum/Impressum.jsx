import React, { useState } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { pageStore } from "../../store/pageStore/pageStore";

import "./Impressum.less";

export const Impressum = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { i18n } = useTranslation();

  const onLanguageChangeHandler = (value) => {
    pageStore.setSelectedLanguage(value);
    if (value === "en") {
      i18n.changeLanguage("en-US");
    } else if (value === "de") {
      i18n.changeLanguage("de-DE");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const textImpressum = {
      EN: <>
        <b>According to § 5 TMG</b> <br />
        LiRo Berlin UG (limited liability)<br />
        Kaiser-Friedrich-Straße, 37A 10627 Berlin<br />
        Commercial register: HRB 254901 B<br />
        Registration court: Charlottenburg District Court<br />
        <br />
        <b>Represented by:</b> <br />
        Dominique Roch, Marc Lindner <br />
        <br />
        <b>Contact</b> <br />
        Phone: +49 176 48 27 58 17 <br />
        E-Mail: impressum@liro.berlin <br />
        <br />
        <b>Tax ID</b> <br />
        VAT registration number in accordance with Section 27 a of the German VAT Act: DE362221138<br />
        <br />
        <b>EU dispute resolution </b> <br />
        The European Commission provides a platform
        Online dispute resolution (ODR) ready: https://ec.europa.eu/consumers/odr/{" "}
        <br />
        <b>Consumer dispute resolution/universal arbitration board </b> <br />
        We are not willing or obliged to participate in an alternative dispute resolution process handled by a consumer dispute resolution body.
      </>,
      DE: <>
      <b>Angaben gemäß § 5 TMG</b> <br />
        LiRo Berlin UG (haftungsbeschränkt) <br />
        Kaiser-Friedrich-Straße, 37A 10627 Berlin <br />
        Handelsregister: HRB 254901 B <br />
        Registergericht: Amtsgericht Charlottenburg <br />
        <br />
        <b>Vertreten durch:</b> <br />
        Dominique Roch, Marc Lindner <br />
        <br />
        <b>Kontakt</b> <br />
        Telefon: +49 176 48 27 58 17 <br />
        E-Mail: impressum@liro.berlin <br />
        <br />
        <b>Umsatzsteuer-ID</b> <br />
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        DE362221138 <br />
        <br />
        <b>EU-Streitschlichtung </b> <br />
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/{" "}
        <br />
        <b>Verbraucherstreitbeilegung/Universalschlichtungsstelle </b> <br />
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </>,
    };

  return (
    <div className="impressum__container">
      <div
        className={`impressum__link ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
        onClick={showModal}
      >
        {pageStore.selectedLanguage === 'en' ? "Legal notice" : "Impressum"}
      </div>
      <Modal
        title={pageStore.selectedLanguage === 'en' ? "Legal notice" : "Impressum"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="impressum__text"
        footer={null}
        centered={true}
      >
        {pageStore.selectedLanguage === 'en' ? textImpressum.EN : textImpressum.DE}
        <br />
        <br />
        <div className="impressum__switchlanguage">
          <span 
            className={`${pageStore.selectedLanguage === 'en' ? 'selected' : 'unselected'}`}
            onClick={()=> {onLanguageChangeHandler('en')}}
          >
            EN
          </span>
          <span className="separator">|</span>
          <span 
            className={`${pageStore.selectedLanguage === 'de' ? 'selected' : 'unselected'}`}
            onClick={()=> {onLanguageChangeHandler('de')}}
          >
            DE
          </span>        
        </div>
      </Modal>
    </div>
  );
});
