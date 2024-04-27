<Box sx={{ flexGrow: 0 }}>
<Tooltip title="Open settings">
  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    <Switch
      defaultChecked
      color="default"
      inputProps={{ 'aria-label': 'checkbox with default color' }}
      onChange={change}
      checked={check}
    />
  </IconButton>
</Tooltip>
</Box>

const pages = ['About', 'Services', 'Contact', 'SignUp', 'SignIn'];
