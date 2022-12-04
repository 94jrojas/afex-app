import { Box, Grid, Skeleton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Card, CardBody, CardFooter, CardHeader } from '../../components/Card';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import CustomizedTable from '../../components/Table';
import { CustomizedAddButton, CustomizedBoxMessage, CustomizedDeleteButton, CustomizedHeader } from '../../components/Tools';
import FormStudents from './FormStudents';

const columnsForTableStudents = [
  {
    id: "firstName",
    label: "First Name",
    type: "text",
    align: "left",
    sortable: true,
  },
  {
    id: "lastName",
    label: "Last Name",
    type: "text",
    align: "left",
    sortable: true,
  },
  {
    id: "age",
    label: "Age",
    type: "text",
    align: "center",
    sortable: true,
  },
  {
    id: "grade",
    label: "Grade",
    type: "text",
    align: "left",
    sortable: true,
  },
  {
    id: "level",
    label: "Level",
    type: "text",
    align: "left",
    sortable: true,
  },
  {
    id: "section",
    label: "Section",
    type: "text",
    align: "left",
    sortable: true,
  },
];

export default function Index() {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
  });
  api.interceptors.request.use(
    (config) => {
      config.headers["x-api-key"] = process.env.REACT_APP_API_KEY || "";
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  // STATES
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openConfirmationDelete, setOpenConfirmationDelete] = useState(false);
  const [openConfirmationDeleteSelected, setOpenConfirmationDeleteSelected] =
    useState(false);

  const [mode, setMode] = useState("list");
  const [formMode, setFormMode] = useState("");
  const [formData, setFormData] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // FUNCTIONS
  const handleSubmit = async () => {
    if (!isFormValid) return;
    try {
      if (formMode === "add") {
        formData.age = Number(formData.age);
        const newStudentString = JSON.stringify(formData);
        const response = await api.post("/students", newStudentString);
        if (response.status !== 201) {
          toast.error("Error creating student");
          return;
        }
        setStudents([...students, response.data]);
        toast.success("Student added successfully");
      } else if (formMode === "edit") {
        formData.age = Number(formData.age);
        const newStudentString = JSON.stringify(formData);
        const response = await api.patch(
          `/students/${formData.id}`,
          newStudentString
        );
        const newStudents = students.map((student) =>
          student.id === formData.id ? response.data : student
        );
        setStudents(newStudents);
        toast.success("Student updated successfully");
      }
      setMode("list");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      const newStudents = students.filter((student) => student.id !== id);
      setStudents(newStudents);
      toast.success("Student deleted successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  // TABLE AND FORM FUNCTIONS
  const handleSubmitDelete = () => {
    deleteStudent(studentToDelete.id);
    setOpenConfirmationDelete(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmationDelete(false);
  };

  const handleDelete = (item) => {
    setStudentToDelete(item);
    setOpenConfirmationDelete(true);
  };

  const handleSubmitDeleteSelected = () => {
    selected.forEach((id) => {
      deleteStudent(id);
    });
    setSelected([]);
  };

  const handleCancelDeleteSelected = () => {
    setOpenConfirmationDeleteSelected(false);
  };

  const handleDeleteSelected = () => {
    setOpenConfirmationDeleteSelected(true);
  };

  // TABLE FUNCTIONS
  const handleAdd = () => {
    setFormMode("add");
    setFormData({});
    setMode("form");
  };

  const handleEdit = (item) => {
    setFormMode("edit");
    setFormData(item);
    setMode("form");
  };

  const handleBack = () => {
    setMode("list");
  };

  useEffect(() => {
    setIsLoading(false);

    const getStudents = async () => {
      try {
        const response = await api.get("/students");
        setStudents(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error getting students");
      }
    };
    getStudents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {/* BREADCRUMBS */}
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>

        {/* TABLE */}
        <Grid item xs={12}>
          {mode === "list" && (
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  p={2}
                  py={1}
                  justifyContent={"space-between"}
                  border
                >
                  <CustomizedHeader
                    // icon={<AttachMoney />}
                    title={"List of Students"}
                    subtitle={
                      selected.length > 0
                        ? `${selected.length} students to delete`
                        : "Select students to delete"
                    }
                  />
                  <Box display="flex">
                    <Box mr={0.75}>
                      {selected.length > 0 && (
                        <CustomizedDeleteButton
                          onClick={handleDeleteSelected}
                        />
                      )}
                    </Box>
                    <CustomizedAddButton onClick={handleAdd} />
                  </Box>
                </CardHeader>
                <CardBody maxHeight="40rem">
                  {!isLoading && students.length > 0 && (
                    <CustomizedTable
                      defaultOrderBy="fisrtName"
                      selectabledRows
                      selected={selected}
                      setSelected={setSelected}
                      columns={columnsForTableStudents}
                      rows={students}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  )}
                  {!isLoading && students.length === 0 && (
                    <CustomizedBoxMessage message={"No currencies found"} />
                  )}
                  {isLoading && <Skeleton variant="rounded" height={80} />}
                </CardBody>
                <CardFooter px={2} py={1} border>
                  {students.length} students
                  {selected.length > 0 && `, ${selected.length} selected`}
                </CardFooter>
              </Card>
            </Grid>
          )}
          {mode === "form" && (
            <Grid item xs={12}>
              <FormStudents
                handleSubmit={handleSubmit}
                isFormValid={isFormValid}
                setIsFormValid={setIsFormValid}
                formMode={formMode}
                formData={formData}
                setFormData={setFormData}
                onBack={handleBack}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      {/* Confirmation */}
      <ConfirmationDialog
        title={`Delete currency ${studentToDelete?.firstName} ${studentToDelete?.lastName}?`}
        subtitle={"Are you sure you want to delete this student?"}
        message={"This action cannot be undone."}
        open={openConfirmationDelete}
        onClose={handleCancelDelete}
        onConfirm={handleSubmitDelete}
      />
      <ConfirmationDialog
        title={`Delete ${selected.length} students?`}
        subtitle={"Are you sure you want to delete these students?"}
        message={"This action cannot be undone."}
        open={openConfirmationDeleteSelected}
        onClose={handleCancelDeleteSelected}
        onConfirm={handleSubmitDeleteSelected}
      />
    </React.Fragment>
  );
}
