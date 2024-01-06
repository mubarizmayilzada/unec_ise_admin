import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactUI = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 7; // Set items per page to 10

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContacts = async (page) => {
      try {
        const response = await fetch(
          `http://test-api.com/api/v1/contact?PageNumber=${page}&PageSize=${itemsPerPage}`
        );
        const data = await response.json();
        setContacts(data.Contact.items); // Set the contacts for the current page
        setTotalPages(data.Contact.totalPages); // Set the total number of pages
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchContacts(currentPage);
  }, [currentPage]);

  // Update filteredContacts when contacts or searchTerm changes
  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchTerm]);

  // Handle change in pagination
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteContact = async (contactId) => {
    try {
      const response = await fetch(
        `http://test-api.com/api/v1/contact/${contactId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204) {
        alert("Successfully deleted the contact.");
        setContacts(contacts.filter((contact) => contact.id !== contactId));
      } else {
        console.error("Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 mb-[25px] mt-[20px]">
      <input
        type="text"
        placeholder="Search by firstname..."
        className="mb-[20px] p-2 border rounded border-[#ccc] w-[300px] outline-none"
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <Table className="table-auto w-full text-left whitespace-no-wrap">
        <TableHead>
          <TableRow
            className="text-[white]"
            style={{ backgroundColor: "#551D3B", color: "#fff" }}
          >
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              First Name
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Last Name
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Email
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Phone
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Message
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#551D3B",
                color: "#fff",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredContacts.map((contact) => (
            <TableRow key={contact.id} className="bg-white border-b">
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.message}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => deleteContact(contact.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="secondary"
        shape="rounded"
        showFirstButton
        showLastButton
        className="my-4"
      />
    </div>
  );
};

export default ContactUI;
