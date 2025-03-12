import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Grid, TextareaAutosize } from '@mui/material';
import { savePersonalInfo } from '../../redux/formDataSlice';

const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state) => state.formData);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: personalInfo.firstName || '',
      lastName: personalInfo.lastName || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
      address: personalInfo.address || '',
      objective: personalInfo.objective || '',
      github: personalInfo.github || '',
      linkedin: personalInfo.linkedin || '',
    },
  });

  const validateForm = (data) => {
    let valid = true;
    clearErrors();

    if (!data.firstName) {
      setError('firstName', { type: 'manual', message: 'First Name is required' });
      valid = false;
    }
    if (!data.email) {
      setError('email', { type: 'manual', message: 'Email is required' });
      valid = false;
    }
    if (!data.phone) {
      setError('phone', { type: 'manual', message: 'Phone number is required' });
      valid = false;
    }

    return valid;
  };

  const handleFormSubmit = (data) => {
    if (validateForm(data)) {
      dispatch(savePersonalInfo(data));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name (Optional)"
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address (Optional)"
            error={!!errors.address}
            helperText={errors.address?.message}
            fullWidth
          />
        )}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="github"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="GitHub Link"
                placeholder="https://github.com/username"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="LinkedIn Link"
                placeholder="https://linkedin.com/in/username"
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      <Controller
        name="objective"
        control={control}
        render={({ field }) => (
          <Box>
            <Typography variant="h6" gutterBottom>
              Objective
            </Typography>
            <TextareaAutosize
              {...field}
              minRows={5}
              placeholder="Write your career objective..."
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </Box>
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default PersonalInfoForm;
