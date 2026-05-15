import { Box, Container, Typography, Button } from "@mui/material";

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          SalesPilot AI
        </Typography>

        <Typography variant="h5" color="text.secondary" gutterBottom>
          AI Powered CRM and Sales Assistant
        </Typography>

        <Button variant="contained" size="large" sx={{ mt: 4 }}>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;