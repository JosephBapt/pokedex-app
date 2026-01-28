import { Box, Pagination, useMediaQuery, useTheme } from '@mui/material'

interface NavigationProps { 
    size: number,
    onChange: (event: React.ChangeEvent<unknown>, page: number) => void
}  

export const Navigation = ({ onChange, size }: NavigationProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{
      bgcolor: 'background.paper',
      position: 'fixed',
      bottom: 0,
      mb: 1.5,
      p: 1.5,
      zIndex: 1000,
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: 3,
      boxShadow: 6,
      display: 'flex',
      justifyContent: 'center'
    }}
    >
      <Pagination
        count={Math.ceil(size/10)} siblingCount={1} boundaryCount={0} showFirstButton showLastButton variant='outlined' size={isMobile ? 'medium' : 'large'} onChange={onChange}
        sx={{
          '& .MuiPagination-ul': {
            flexWrap: 'nowrap'
          },
          '& .MuiPaginationItem-ellipsis': {
            display: 'none'
          }
        }}
      />
    </Box>
  )
}
