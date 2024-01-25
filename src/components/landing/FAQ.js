import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function FAQ() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{maxWidth:'1100px', margin:'auto'}}>
      <Typography variant='h1' sx={{color:'#0f77ff', textAlign:'center', marginBottom:'2rem', fontSize:{xs:'2rem', md:'2.5rem'}}}>Frequently Asked Question(FAQ)</Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant='h5' sx={{fontSize:'1.2rem'}}>1. How do I start the home buying process?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            To start the home buying process, you can begin by getting pre-approved for a mortgage, researching neighborhoods, and finding a qualified real estate agent to guide you through the process.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography variant='h5' sx={{fontSize:'1.2rem'}}>2. What factors should I consider when selling my property?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          When selling your property, consider factors such as pricing, market conditions, staging your home, and working with a real estate professional to market your property effectively.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography variant='h5' sx={{fontSize:'1.2rem'}}>3. How can I determine the value of my home?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The value of your home can be determined through a comparative market analysis (CMA) conducted by a real estate agent, considering recent sales of similar properties in your area.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography variant='h5' sx={{fontSize:'1.2rem'}}>4. How can I trust a real estate agent or agency?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Trusting a real estate agent or agency is crucial. Look for agents with positive reviews, experience in the local market, and relevant credentials. You can also ask for references and meet with them to discuss your needs before making a decision.
          </Typography> 
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}