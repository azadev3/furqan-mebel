import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/system';
import { atom, useRecoilState } from 'recoil';

const marks = [
  { value: 3, label: '3' },
  { value: 6, label: '6' },
  { value: 12, label: '12' },
  { value: 18, label: '18' },
  { value: 24, label: '24' },
];

const StyledSlider = styled(Slider)(({ }) => ({
  maxWidth: '120px',
  minWidth: '120px',
  '& .MuiSlider-thumb': {
    backgroundColor: '#fff',
    border: '2px solid #0f0',
  },
  '& .MuiSlider-track': {
    backgroundColor: '#0f0',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#ccc',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#0f0',
    height: 8,
    width: 2,
  },
  '& .MuiSlider-markLabel': {
    top: 30,
    color: '#909090',
    fontSize: "12px"
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#43B749',
    borderRadius: "8px",
    color: '#fff',
  },
}));

export const SliderValue = atom<number>({
  key: 'sliderValueKey', 
  default: 12,
});

export default function SliderSizes() {
  const [value, setValue] = useRecoilState(SliderValue);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <StyledSlider
        aria-label="Credit terms"
        value={value}
        valueLabelDisplay="on"
        step={null}
        marks={marks}
        min={3}
        max={24}
        onChange={handleChange}
      />
    </Box>
  );
}