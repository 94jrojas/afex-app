import { BubbleChart } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "./Card";
import CustomizedDialog from "./Dialog";
import { CustomizedHeader } from "./Tools";

export default function ConfirmationDialog({
  open,
  onClose,
  maxWidth = "sm",
  title,
  subtitle,
  message,
  icon,
  onConfirm,
}) {
  const theme = useTheme();
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <CustomizedDialog open={open} onClose={handleClose} maxWidth={maxWidth}>
      <Card>
        <CardHeader p={2} py={1} justifyContent={"space-between"}>
          <CustomizedHeader title={title} subtitle={subtitle} />
          <Box color={theme.palette.third.main}>
            {!icon && <BubbleChart fontSize="large" />}
            {icon}
          </Box>
        </CardHeader>
        {message && (
          <CardBody p={2} py={2}>
            {/* Message in typo */}
            <Typography variant="body1" color="textSecondary">
              {message}
            </Typography>
          </CardBody>
        )}
        <CardFooter justifyContent={"space-between"} p={1} px={2}>
          <Button onClick={handleClose} color="third">
            CANCEL
          </Button>
          {onConfirm && (
            <Button onClick={handleConfirm} color="third">
              CONFIRM
            </Button>
          )}
        </CardFooter>
      </Card>
    </CustomizedDialog>
  );
}
