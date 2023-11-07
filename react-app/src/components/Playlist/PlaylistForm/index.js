import React, { useState } from 'react';
import { TextField, Switch, FormControlLabel, Button, Box } from '@mui/material';

function PlaylistForm ({ onSubmit }) {
  const [formValues, setFormValues] = useState({ name: '', private: false});


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
      <TextField
        label="playlist name"
        variant="outlined"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        required
        sx={{
          '& label.Mui-focused': {
            color: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
            },
            '&:hover fieldset': {
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        }}
      />
    <FormControlLabel
      control={<Switch checked={formValues.private} onChange={handleChange} name="private" color="default" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'black', '& + .MuiSwitch-track': { backgroundColor: 'black' } } }} />}
      label="private?"
      sx={{ color: 'black' }}
    />
  <Button type="submit" variant="contained" sx={{ backgroundColor: 'gray', textTransform: 'none', '&:hover': { backgroundColor: 'black' } }}>
  create playlist
  </Button>
    </Box>
  );
}

export default PlaylistForm
