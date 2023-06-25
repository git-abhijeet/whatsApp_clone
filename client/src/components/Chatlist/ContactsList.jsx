import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [{ }, dispatch] = useStateProvider();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data: { users } } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
      } catch (error) {
        console.log("🚀 ~ file: ContactsList.jsx:13 ~ useEffect ~ error:", error)
      }
    }
    getContacts();
  }, []);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-24 px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack className="text-xl cursor-pointer" onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })} />
          <span>
            New Chat
          </span>
        </div>
      </div>
      <div className="flex-auto h-full overflow-auto bg-search-input-container-background custom-scrollbar">
        <div className="flex items-center gap-3 py-3 h-14">
          <div className="flex items-center flex-grow gap-5 px-3 py-1 mx-4 rounded-lg bg-panel-header-background">
            <div className="">
              <BiSearchAlt2 className="cursor-pointer text-l text-panel-header-icon" />
            </div>
            <div>
              <input type="text" placeholder="Search Contacts" className="w-full text-sm text-white bg-transparent focus:outline-none" />
            </div>
          </div>
        </div>
        {
          Object.entries(allContacts).map(([initialLetter, userList]) => {
            return (
              <div key={Date.now() + initialLetter}>
                <div className="py-5 pl-10 text-teal-light">
                  {initialLetter}
                </div>
                {
                  userList.map(contact => {
                    return (
                      <ChatLIstItem data={contact} isContactPage={true} key={contact.id} />
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default ContactsList;
