'use client'

import styles from "./vote_id_field.module.css";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface MyFormElements extends HTMLFormControlsCollection {
    id_input_field: HTMLInputElement
  }
  
  interface MyFormElements extends HTMLFormElement {
    readonly elements: MyFormElements
  }

export default function Home() {

    let ids: Array<string>;
    const router = useRouter();

    useEffect(() => {
        ids = ["1", "2", "3"];
      })

    function closeForm() {
        const myForm = document.getElementById("myForm");
      
        if (myForm) {
          myForm.style.display = "none";
        }
      }


    function handleSubmit(event: React.FormEvent<MyFormElements>) {
        event.preventDefault();
        
        const field = event.currentTarget.id_input_field;
        console.log(field.value);
        if (ids.includes(field.value)) {
          router.push("/vote");
          closeForm();
        } else {
          alert("The given id is invalid!");
          field.value = "";
        }
      }

    return (
        <section className={styles.form_section}>
            <div className={styles.form_popup} id="myForm">
                <h1 className={styles.form_header}>Vote Online</h1>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <label htmlFor="id_number" className={styles.id_label}><b>Id Number</b></label>
                    <input type="text" placeholder="Id" name="id_number" id="id_input_field" required />
                    <div className={styles.btn_div}>
                        <button type="submit" className={styles.btn}>
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}