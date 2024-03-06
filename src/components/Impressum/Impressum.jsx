import React, { useState } from "react";
import { Modal } from "antd";

import { pageStore } from "../../store/pageStore/pageStore";

import "./Impressum.less";

export const Impressum = () => {
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

  return (
    <>
      <div
        className={`impressum__link ${pageStore.selectedTheme === "light" ? "lightColorTheme__SubText" : "darkColorTheme__SubText"}`}
        onClick={showModal}
      >
        Impressum
      </div>
      <Modal
        title="Impressum"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="impressum__text"
        footer={null}
      >
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
        <br />
        <br />
      </Modal>
    </>
  );
};
