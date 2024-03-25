import React, { useState } from "react";
import { Modal } from "antd";
import { observer } from "mobx-react";

import { pageStore } from "../../store/pageStore/pageStore";

import "./Impressum.less";

export const Impressum = observer(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        Sales tax identification number in accordance with Section 27 a of the Sales Tax Act:
        DE362221138 <br />
        <br />
        <b>EU dispute resolution </b> <br />
        The European Commission provides a platform
        Online dispute resolution (ODR) ready: https://ec.europa.eu/consumers/odr/{" "}
        <br />
        You can find our email address in the legal notice above.<br />
        <br />
        <b>Consumer dispute resolution/universal arbitration board </b> <br />
        We are not obliged to participate in dispute resolution procedures before a
        to participate in the consumer arbitration board.
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
        Unsere E-Mail-Adresse finden Sie oben im Impressum. <br />
        <br />
        <b>Verbraucherstreitbeilegung/Universalschlichtungsstelle </b> <br />
        Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer
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
      </Modal>
    </div>
  );
});
