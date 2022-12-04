import { ArrowBack, Check, NoteAlt } from '@mui/icons-material';
import { Box, Button, FormLabel, Grid, IconButton, TextField, Tooltip, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '../../components/Card';
import { CustomizedHeader } from '../../components/Tools';

export default function FormStudents({
  formMode,
  formData,
  setFormData = () => {},
  onBack = () => {},
  handleSubmit = () => {},
  isFormValid,
  setIsFormValid = () => {},
}) {
  const theme = useTheme();
  // const [ formData, setFormData ] = useState({});
  const [isRequired, setIsRequired] = useState(true);
  // const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = (event) => {
    const { name, value, validationMessage } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: validationMessage });
    setIsFormValid(event.target.form.checkValidity());
  };

  useEffect(() => {
    if (formMode === "edit") {
      setIsRequired(false);
      setIsFormValid(true);
    } else {
      setIsRequired(true);
      setIsFormValid(false);
    }
    setFormErrors({});
  }, [formMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card>
      <CardHeader p={2} py={1} justifyContent={"space-between"}>
        <Box display="flex">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr={1}
          >
            <Tooltip title="Back to list">
              <IconButton onClick={onBack}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </Box>
          <CustomizedHeader
            title={"FORM CURRENCY"}
            subtitle={
              formMode === "add"
                ? "Add a new currency"
                : "Edit the selected currency"
            }
          />
        </Box>

        <Box color={theme.palette.third.main}>
          <NoteAlt fontSize="large" />
        </Box>
      </CardHeader>
      <CardBody px={2} py={1}>
        <Box
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <Grid container rowSpacing={2} columnSpacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                    PROFILE
                  </FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="firtName"
                    name="firstName"
                    label="First Name"
                    helperText={
                      formErrors["firstName"] || "Enter the first name"
                    }
                    autoFocus
                    fullWidth
                    required={isRequired}
                    color={"third"}
                    autoComplete="off"
                    onChange={handleOnChange}
                    value={formData["firstName"] || ""}
                    error={!!formErrors["firstName"]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    helperText={formErrors["lastName"] || "Enter the last name"}
                    fullWidth
                    required={isRequired}
                    color={"third"}
                    autoComplete="off"
                    onChange={handleOnChange}
                    value={formData["lastName"] || ""}
                    error={!!formErrors["lastName"]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="age"
                    name="age"
                    label="Age"
                    type="number"
                    helperText={formErrors["age"] || "Enter the age"}
                    fullWidth
                    required={isRequired}
                    color={"third"}
                    autoComplete="off"
                    onChange={handleOnChange}
                    value={formData["age"] || ""}
                    error={!!formErrors["age"]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={1} columnSpacing={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <FormLabel component="legend" sx={{ marginBottom: 1 }}>
                    STUDY
                  </FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="grade"
                    name="grade"
                    label="Grade"
                    helperText={formErrors["grade"] || "Enter the grade"}
                    fullWidth
                    required={isRequired}
                    color={"third"}
                    autoComplete="off"
                    onChange={handleOnChange}
                    value={formData["grade"] || ""}
                    error={!!formErrors["grade"]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="level"
                    name="level"
                    label="Level"
                    helperText={formErrors["level"] || "Enter the level"}
                    fullWidth
                    required={isRequired}
                    color={"third"}
                    autoComplete="off"
                    onChange={handleOnChange}
                    value={formData["level"] || ""}
                    error={!!formErrors["level"]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="section"
                    name="section"
                    label="Section"
                    helperText={formErrors["section"] || "Enter the section"}
                    fullWidth
                    required={isRequired}
                    color={"third"}
                    autoComplete="off"
                    onChange={handleOnChange}
                    value={formData["section"] || ""}
                    error={!!formErrors["section"]}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardBody>
      <CardFooter justifyContent={"space-between"} p={1} px={2}>
        {/* Cancel Button */}
        <Button
          onClick={onBack}
          variant="text"
          color="third"
          startIcon={<ArrowBack />}
        >
          CANCEL
        </Button>
        {/* Save Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          color="third"
          startIcon={<Check />}
        >
          SAVE
        </Button>
      </CardFooter>
    </Card>
  );
}
