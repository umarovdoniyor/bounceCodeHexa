import React, {Component, useState} from "react";
import styled, {withTheme} from "styled-components";
import {connect} from "react-redux";

import Table from "./Table";
// import { darken } from "polished";

import {
  // Badge,
  Grid,
  Hidden,
  // InputBase,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  // Card as MuiCard,
  // CardContent,
  // Typography,
  // Paper as MuiPaper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core";

import {Menu as MenuIcon} from "@material-ui/icons";

// import { spacing } from "@material-ui/system";

import {
  // Bell,
  // MessageSquare,
  // Search as SearchIcon,
  Power
} from "react-feather";
import firebaseApp from "../firebase/firebase";
import {Redirect} from "react-router-dom";

// const Card = styled<any>(MuiCard)(spacing);

// const Paper = styled<any>(MuiPaper)(spacing);

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

// const Indicator = styled(Badge)`
//   .MuiBadge-badge {
//     background: ${props => props.theme.header.indicator.background};
//     color: ${props => props.theme.palette.common.white};
//   }
// `;

// const Search = styled.div`
//   border-radius: 2px;
//   background-color: ${props => props.theme.header.background};
//   display: none;
//   position: relative;
//   width: 100%;

//   &:hover {
//     background-color: ${props => darken(0.05, props.theme.header.background)};
//   }

//   ${props => props.theme.breakpoints.up("md")} {
//     display: block;
//   }
// `;

// const SearchIconWrapper = styled.div`
//   width: 50px;
//   height: 100%;
//   position: absolute;
//   pointer-events: none;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   svg {
//     width: 22px;
//     height: 22px;
//   }
// `;

// const Input = styled(InputBase)`
//   color: inherit;
//   width: 100%;

//   > input {
//     color: ${props => props.theme.header.search.color};
//     padding-top: ${props => props.theme.spacing(2.5)}px;
//     padding-right: ${props => props.theme.spacing(2.5)}px;
//     padding-bottom: ${props => props.theme.spacing(2.5)}px;
//     padding-left: ${props => props.theme.spacing(12)}px;
//     width: 160px;
//   }
// `;

// const Flag = styled.img`
//   border-radius: 50%;
//   width: 22px;
//   height: 22px;
// `;

// class LanguageMenu extends Component {
//   state = {
//     anchorMenu: null
//   };

//   toggleMenu = (event: any) => {
//     this.setState({ anchorMenu: event.currentTarget });
//   };

//   closeMenu = () => {
//     this.setState({ anchorMenu: null });
//   };

//   render() {
//     const { anchorMenu } = this.state;
//     const open = Boolean(anchorMenu);

//     return (
//       <React.Fragment>
//         <IconButton
//           aria-owns={open ? "menu-appbar" : undefined}
//           aria-haspopup="true"
//           onClick={this.toggleMenu}
//           color="inherit"
//         >
//           <Flag src="/static/img/flags/us.png" alt="English" />
//         </IconButton>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorMenu}
//           open={open}
//           onClose={this.closeMenu}
//         >
//           <MenuItem
//             onClick={() => {
//               this.closeMenu();
//             }}
//           >
//             한국어
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               this.closeMenu();
//             }}
//           >
//             영어
//           </MenuItem>
//         </Menu>
//       </React.Fragment>
//     );
//   }
// }

const UserMenu = () => {
  const [redirect, setRedirect] = useState();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const open = Boolean(anchorMenu);

  const toggleMenu = (event: any) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <React.Fragment>
      <IconButton
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
      >
        <Power />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={open}
        onClose={closeMenu}
      >
        {/* <MenuItem
        onClick={() => {
          this.closeMenu();
        }}
      >
        내 정보 수정
      </MenuItem> */}
        <MenuItem
          onClick={async () => {
            await firebaseApp.auth().signOut();
            setRedirect("/auth/sign-in");
          }}
        >
          로그아웃
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

class FormDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          현재 프로젝트: BounceCode
        </Button>
        <Dialog
          fullWidth={this.state.fullWidth}
          maxWidth="md"
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Table />
        </Dialog>
      </React.Fragment>
    );
  }
}

interface Props {
  onDrawerToggle:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}

const Header: any = ({onDrawerToggle}: Props) => (
  <React.Fragment>
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center">
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item>
            <FormDialog />
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Input placeholder="Search topics" />
            </Search> */}
          </Grid>
          <Grid item xs />
          <Grid item>
            {/* <IconButton color="inherit">
              <Indicator badgeContent={3}>
                <MessageSquare />
              </Indicator>
            </IconButton>
            <IconButton color="inherit">
              <Indicator badgeContent={7}>
                <Bell />
              </Indicator>
            </IconButton> */}
            {/* <LanguageMenu /> */}
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default connect()(withTheme(Header));
