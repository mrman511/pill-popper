import React from "react";
import axios from "axios";
import MedicationItem from "./MedicationItem";

export default function MedicationItemList(props) {
  const medications = props.medications[0].medications;


  const medicationItemList = medications.map((medication) => {

    const deleteMe = function () {

      // const med = {
      //   ...props.medications[medication.id]
      // }


      axios.delete(`/medications/${medication.id}/delete`)
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
      const childObj = props.childrenState[child];
      if (medStartDate <= today && medEndDate(medication) >= today) {

        if (props.childState && props.childState === childObj.id && childObj.id === medication.child_id) {
          return (
            <MedicationItem
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
              key={medication.id}
              {...medication}
              destroy={props.destroy}
              setDestroy={props.setDestroy}
              child={childObj.name}
              deleteMe={deleteMe}
              onEdit={() => { props.edit(medication) }}
            />
          );
        }
      }
    }
  });

  return <>{medicationItemList}</>;
}
