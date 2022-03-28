import React, { Fragment } from "react";
import axios from "axios";
import MedicationItem from "./MedicationItem";


export default function MedicationItemList(props) {
  console.log(props)
  const medications = props.medications[0].medications;


  const medicationItemList = medications.map((medication) => {

   

    const deleteMe = function () {

      axios.delete(`http://localhost:8081/medications/${medication.id}/delete`)
        .then(() => {
          props.setMedications((prev) => [{ ...prev, medications: props.medications[0].medications.filter(med => med.id !== medication.id) }])
        })
    }
    const medEndDate = (medication) => {

      if (medication.end_date) {
        return new Date(medication.end_date)

      } else {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      }
    }

    const medStartDate = new Date(medication.start_date);
    // const medEndDate = new Date(medication.end_date);

    const today = props.date;


    for (let child in props.childrenState) {
      // console.log("color", props.childrenState[child].avatar_url);
      const childObj = props.childrenState[child];
      if (medStartDate <= today && medEndDate(medication) >= today) {

        if (props.childState && props.childState === childObj.id && childObj.id === medication.child_id) {
          return (
            <MedicationItem
              color={childObj.avatar_url}
              key={medication.id}
              {...medication}
              destroy={props.destroy}
              setDestroy={props.setDestroy}
              child={childObj.name}
              onEdit={() => { props.edit(medication) }}
            />
          );
        }

        else if (!props.childState && childObj.id === medication.child_id) {
         
          return (
            <MedicationItem
              color={childObj.avatar_url}
              key={medication.id}
              {...medication}
              destroy={props.destroy}
              setDestroy={props.setDestroy}
              child={childObj.name}
              deleteMe={deleteMe}
              onEdit={() => { props.edit(medication) }}
              getFda={ () => { props.getFda(medication.fda_id) } }
            />
          );
        }
      }
    }
  });

  return <Fragment>{medicationItemList}</Fragment>;
}
