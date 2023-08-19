import { useEffect, useState } from "react";
import "./App.css";
import TicketTable from "./components/TicketTable.js";
import TicketForm from "./components/TicketForm";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import {
  createTicket,
  deleteTicket,
  fetchAllTickets,
  updateTicket,
} from "./service/ticketService";
import { formatDate } from "./util/dateUtil";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const COLS = [
  "id",
  "summary",
  "priority",
  "status",
  "create_date",
  "update_date",
];

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});

  const loadTicket = (ticket) => {
    setCurrentTicket(ticket);
  };

  const unloadTicket = () => {
    setCurrentTicket({});
  };

  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  };

  const sendSaveRequest = async (
    id,
    summary,
    priority,
    status,
    create_date,
    update_date,
  ) => {
    const newTicket = {
      id,
      summary,
      priority,
      status,
      create_date: formatDate(new Date(create_date)),
      update_date: formatDate(new Date(update_date)),
    };

    const savedTicket = id
      ? await updateTicket(id, newTicket)
      : await createTicket(newTicket);

    if (!savedTicket) {
      return;
    }

    getAllTickets();
    // setCurrentTicket(savedTicket);
    unloadTicket();
  };

  const sendDeleteRequest = async (ticket) => {
    if (!ticket?.id) {
      return;
    }

    const result = await deleteTicket(ticket.id);
    if (!result) {
      return;
    }

    getAllTickets();
    setCurrentTicket({});
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <>
      <TicketTable
        list={tickets}
        colNames={COLS}
        onSelect={loadTicket}
        onDelete={sendDeleteRequest}
      />
      <Button backgroundColor={"lightseagreen"} onClick={onOpen}>
        Add Ticket
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <TicketForm
            id={currentTicket.id}
            summary={currentTicket.summary}
            priority={currentTicket.priority}
            status={currentTicket.status}
            createDate={
              currentTicket.create_date
                ? new Date(currentTicket.create_date)
                : new Date()
            }
            updateDate={
              currentTicket.update_date
                ? new Date(currentTicket.update_date)
                : new Date()
            }
            readonly={false}
            onSubmit={sendSaveRequest}
            onClear={unloadTicket}
          />
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;
