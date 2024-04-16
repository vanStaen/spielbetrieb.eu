import React from "react";
import { observer } from "mobx-react";
import { Tag } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { nameParser } from "../../../../../../helpers/dev/nameParser";

import { spielplanStore } from "../../../../../../store/spielplanStore/spielplanStore";
import { pageStore } from "../../../../../../store/pageStore/pageStore";

import "./EventPageDescEquipment.less";

export const EventPageDescEquipment = observer((props) => {
  const { event } = props;

  const equipmentsTags = () => {
    const equipments = event?.equipment?.map((equipementId) => {
      return {
        name: nameParser(
          spielplanStore.equipments.filter(
            (equipment) => parseInt(equipment._id) === equipementId,
          )[0]?.name,
          pageStore.selectedLanguage?.toLowerCase(),
        ),
        id: equipementId,
      };
    });

    const equipmentsTagsFormatted = equipments?.map((equipment) => {
      return (
        <Tag key={equipment.id} bordered={false}>
          {equipment.name}
        </Tag>
      );
    });
    return equipmentsTagsFormatted;
  };

  return (
    <div className="eventpage__equipementContainer">
      <div className="eventpage__equipmentTitle">
        Equipment <EditOutlined className="editOutlined" />
      </div>
      <div className="eventpage__subInfo">{equipmentsTags()}</div>
    </div>
  );
});
