import React, { Fragment } from "react";
import { observer } from "mobx-react";
import { Select, InputNumber, Row, Col, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { updateEvent } from "../../../../../Admin/AdminEvents/updateEvent";
import { priceOptions } from "../../../../../../lib/data/priceOptions";
import { eventFormStore } from "../../eventFormStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";

export const OptionFormPrices = observer((props) => {
  const { t } = useTranslation();

  const priceHandler = (value, index) => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject[index].amount = value;
    console.log(tempPricesObject);
    eventFormStore.setPrices(tempPricesObject);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        prices: JSON.stringify(tempPricesObject),
      });
  };

  const priceOptionHandler = (value, index) => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject[index].option = value;
    eventFormStore.setPrices(tempPricesObject);
    eventFormStore.eventId &&
      updateEvent(eventFormStore.eventId, {
        prices: JSON.stringify(tempPricesObject),
      });
  };

  const handleAddPrice = () => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject.push({ amount: null, option: null });
    eventFormStore.setPrices(tempPricesObject);
  };

  const handleDeletePrice = (index) => {
    const tempPricesObject = eventFormStore.prices;
    tempPricesObject.splice(index, 1);
    eventFormStore.setPrices(tempPricesObject);
  };

  return (
    <div className="optionform__element">
      <div className="optionform__title">{t("eventform.prices")}</div>
      <Row gutter={[16, 8]}>
        {eventFormStore.prices.map((price, index) => {
          return (
            <Fragment key={`priceRow${index}`}>
              <Col xs={7} sm={7} md={4} key={`col-amount-${index}`}>
                <InputNumber
                  prefix="€"
                  placeholder={t("eventform.price")}
                  onChange={(event) => priceHandler(event, index)}
                  value={price.amount}
                  onFocus={() => eventFormStore.setDeactivateNav(true)}
                  onBlur={() => eventFormStore.setDeactivateNav(false)}
                />
              </Col>
              <Col xs={17} sm={17} md={20} key={`col-option-${index}`}>
                <Select
                  value={price.option}
                  options={priceOptions[pageStore.selectedLanguage]}
                  placeholder={t("eventform.priceType")}
                  onChange={(event) => priceOptionHandler(event, index)}
                  disabled={!price.amount}
                  className="optionform__priceSelect"
                  onFocus={() => eventFormStore.setDeactivateNav(true)}
                  onBlur={() => eventFormStore.setDeactivateNav(false)}
                />
                {index ? (
                  <Button
                    className="optionform__deletePriceButton"
                    onClick={() => handleDeletePrice(index)}
                    disabled={!price.amount}
                  >
                    <DeleteOutlined />
                  </Button>
                ) : (
                  <Button
                    className="optionform__priceButton"
                    onClick={handleAddPrice}
                    disabled={
                      !price.amount ||
                      eventFormStore.prices.length === priceOptions.length
                    }
                  >
                    <PlusOutlined />
                  </Button>
                )}
              </Col>
            </Fragment>
          );
        })}
      </Row>
    </div>
  );
});
