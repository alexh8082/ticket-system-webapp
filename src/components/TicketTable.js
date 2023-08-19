import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Card,
  CardBody,
  Button,
  HStack,
  CardHeader,
  Text,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const btnStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "5px 10px",
};

function TicketTable({
  list,
  colNames,
  pageNum = 0,
  pageSize = 10,
  width = "auto",
  height = "auto",
  onSelect = null,
  onDelete = null,
}) {
  const [page, setPage] = useState(pageNum);

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page);
  };

  const onNext = () => {
    setPage(page + 1 < list.length / pageSize ? page + 1 : page);
  };

  const openForm = () => {};

  return (
    <div>
      <Card backgroundColor="slategrey">
        <CardHeader backgroundColor="whitesmoke">
          <Heading size="md">TICKET REGISTRY</Heading>
        </CardHeader>
        <CardBody minH="500px">
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Ticket Registry</TableCaption>
              <Thead>
                <Tr>
                  {colNames.map((headerItem, index) => (
                    <th key={index}>{headerItem.toUpperCase()}</th>
                  ))}
                  {onDelete && <th>Actions</th>}
                </Tr>
              </Thead>
              <Tbody>
                {Object.values(
                  list.slice(pageSize * page, pageSize * page + pageSize),
                ).map((obj, index) => (
                  <tr key={index}>
                    {Object.values(obj).map((value, index2) => (
                      <td key={index2} onClick={() => onSelect(obj)}>
                        {value}
                      </td>
                    ))}
                    {onDelete && (
                      <td align={"center"}>
                        <button
                          className="button"
                          onClick={() => onDelete(obj)}
                        >
                          <DeleteIcon></DeleteIcon>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </Tbody>
              <Tfoot>
                <tr>
                  <td colSpan={colNames.length}></td>
                </tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <HStack justifyContent="center" padding={6}>
            <Button style={btnStyle} onClick={onBack}>
              Back
            </Button>
            <label>{page + 1}</label>
            <Button style={btnStyle} onClick={onNext}>
              Next
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </div>
  );
}

export default TicketTable;
