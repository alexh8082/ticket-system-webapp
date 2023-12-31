import {
  Card,
  CardBody,
  Input,
  Button,
  HStack,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { formatDate } from "../util/dateUtil";

function TicketForm({
  id = "",
  summary,
  priority,
  status,
  createDate = new Date(),
  updateDate = new Date(),
  readonly = false,
  onSubmit = () => {},
  onClear = () => {},
}) {
  const [tSummary, setTSummary] = useState(summary);
  const [tPriority, setTPriority] = useState(priority);
  const [tStatus, setTStatus] = useState(status);

  useEffect(() => {
    setTSummary(summary || "");
    setTPriority(priority || "LOW");
    setTStatus(status || "CREATED");
  }, [id, priority, status, summary]);

  return (
    <div>
      <Card backgroundColor="lightgray">
        <CardHeader backgroundColor="teal">
          <Text fontSize={22}>CREATE / UPDATE TICKET</Text>
        </CardHeader>
        <CardBody>
          <label htmlFor="id">ID</label>
          <Input
            placeholder="Ticket ID"
            type="number"
            value={id}
            name="id"
            backgroundColor="white"
            disabled
          />
          <label htmlFor="summary">Summary</label>
          <Input
            placeholder="Enter Summary"
            type="text"
            backgroundColor="white"
            name="summary"
            value={tSummary}
            onChange={(e) => setTSummary(e.target.value)}
            disabled={readonly}
          />
          <label htmlFor="priority">Priority</label>
          <Select
            placeholder="Select option"
            name="priority"
            backgroundColor="white"
            value={tPriority}
            onChange={(e) => setTPriority(e.target.value)}
            disabled={readonly}
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </Select>
          <label htmlFor="status">Status</label>
          <Select
            placeholder="Select option"
            name="status"
            backgroundColor="white"
            value={tStatus}
            onChange={(e) => setTStatus(e.target.value)}
            disabled={readonly}
          >
            <option>CREATED</option>
            <option>REJECTED</option>
            <option>IN PROGRESS</option>
            <option>COMPLETED</option>
          </Select>
          <label htmlFor="createDate">Create Date</label>
          <Input
            placeholder="Basic usage"
            type="date"
            backgroundColor="white"
            value={formatDate(createDate)}
            name="createDate"
            disabled
          />
          <label htmlFor="updateDate">Update Date</label>
          <Input
            placeholder="Basic usage"
            type="date"
            backgroundColor="white"
            value={formatDate(updateDate)}
            name="updateDate"
            disabled
          />
          <HStack justifyContent={"space-between"} padding={4}>
            <Button
              onClick={() => {
                onSubmit(
                  id,
                  tSummary,
                  tPriority,
                  tStatus,
                  createDate,
                  new Date().toString(),
                );
              }}
            >
              Submit
            </Button>
            <Button onClick={onClear}>Clear</Button>
          </HStack>
        </CardBody>
      </Card>
    </div>
  );
}

export default TicketForm;
