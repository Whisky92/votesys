'use client'

import { GetServerSideProps } from "next";
import styles from "./vote_id_field.module.css";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface MyFormElements extends HTMLFormControlsCollection {
    id_input_field: HTMLInputElement
}
  
interface MyFormElements extends HTMLFormElement {
  readonly elements: MyFormElements
}

const BASE_URL = 'http://127.0.0.1:5000/vote/get-voting-interval';

interface Post {
  id: number;
  title: string;
}

export default function VoteField() {

    let ids: Array<string>;
    const router = useRouter();

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        ids = ["1", "2", "3"];
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:5000/vote/get-voting-interval');
            const data = response.data;
            console.log(data);
          } catch (error) {
            console.log("Error occured");
          }
        }

        fetchData();
    });

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
          router.push(`/vote?id=${field.value}`);
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