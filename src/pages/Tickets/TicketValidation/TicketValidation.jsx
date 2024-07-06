import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
  QuestionOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { GlitchText } from "../../../components/GlitchText/GlitchText";
import { CustomSpinner } from "../../../components/CustomSpinner/CustomSpinner";
import { LoginForm } from "../../../components/LoginForm/LoginForm";
import { userStore } from "../../../store/userStore/userStore";
import { isTicketValid } from "./isTicketValid";
import { patchTicket } from "./patchTicket";

import "../Tickets.less";

// TODO: Adapt for Spielbetrieb
export const TicketValidation = () => {
  const { event, ticketId } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [secondStepConfirm, setSecondStepConfirm] = useState(false);
  const [isValid, setIsValid] = useState(null);
  const [isPunched, setIsPunched] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const fetchTicketData = async () => {
    const isTicketValidRes = await isTicketValid(ticketId);
    setLoading(false);
    if (isTicketValidRes.getTicket.length === 0) {
      setIsValid(false);
    } else if (isTicketValidRes.getTicket.length > 1) {
      setIsValid(false);
    } else {
      setIsValid(isTicketValidRes.getTicket[0].valid);
      setIsPunched(isTicketValidRes.getTicket[0].punched);
    }
  };

  const punchTicket = async () => {
    setLoading(true);
    try {
      await patchTicket(ticketId);
      await fetchTicketData();
    } catch (e) {
      console.log(e);
    }
    setSecondStepConfirm(false);
    setLoading(false);
  };

  useEffect(() => {
    const element = document.getElementById("pageTicketContainer");
    element.style.backgroundImage = "none";
    fetchTicketData();
  }, []);

  useEffect(() => {
    const element = document.getElementById("pageTicketContainer");
    isLoading || secondStepConfirm
      ? (element.style.backgroundColor = "Black")
      : isValid
        ? isPunched
          ? (element.style.backgroundColor = "IndianRed")
          : (element.style.backgroundColor = "LimeGreen")
        : (element.style.backgroundColor = "FireBrick");
  }, [isLoading, isValid, isPunched, secondStepConfirm]);

  return (
    <div id="pageTicketContainer" className="pageTicketContainer">
      {userStore.isAdmin ? (
        <>
          <GlitchText
            overText={
              secondStepConfirm
                ? "You are sure that you want to"
                : isLoading
                  ? "Checking that"
                  : isValid
                    ? "This ticket is"
                    : "No-go, my friend!"
            }
            glitchText={
              secondStepConfirm
                ? "Use this ticket?"
                : isLoading
                  ? "Ticket"
                  : isValid
                    ? isPunched
                      ? "Already Used"
                      : "Valid"
                    : "Invalid"
            }
          />
          {isLoading ? (
            <>
              <CustomSpinner />
              <div className="ticketId">
                <div style={{ opacity: 0.4, paddingBottom: "7px" }}>
                  {event} - ticket id:{" "}
                </div>
                {ticketId}
              </div>
            </>
          ) : (
            <>
              <div className="ticketValidationContainer">
                {secondStepConfirm ? (
                  <QuestionOutlined className="icon" onClick={punchTicket} />
                ) : isValid ? (
                  isPunched ? (
                    <ExclamationOutlined className="icon" />
                  ) : (
                    <CheckOutlined
                      className="icon pointer"
                      onClick={() => setSecondStepConfirm(true)}
                    />
                  )
                ) : (
                  <CloseOutlined className="icon" />
                )}
                <div className="ticketId">
                  <div style={{ opacity: 0.4, paddingBottom: "7px" }}>
                    {event} - ticket id:{" "}
                  </div>
                  {ticketId}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div
          className="ticketValidationContainer"
          style={{ background: "black" }}
        >
          <div
            className="logoutIconContainer"
            onClick={() => setShowLoginForm(!showLoginForm)}
          >
            {showLoginForm ? <CloseOutlined /> : <LockOutlined />}
          </div>
          {showLoginForm && (
            <LoginForm
              setHasAccess={userStore.setIsAdmin}
              setShowLoginForm={setShowLoginForm}
              closable={false}
              showBackgroundImg={true}
            />
          )}
          {/* TODO: Here always show event details page */}
          <img
            src="https://www.schwerelos-berlin.com/pathfinder.jpg"
            width="100%"
          />
        </div>
      )}
    </div>
  );
};
