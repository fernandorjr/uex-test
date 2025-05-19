// @ts-nocheck
import { useAuth, useNavigate } from '@/hooks';
import { ERoutes } from '@/tokens/routes';
import { useRef } from 'react';
import './header.style.css';
import useNotify from '@/hooks/notify/notify.hook';
import { ENotifyType } from '@/hooks/notify/notify.interface';

export default function Header() {
  const { navigate } = useNavigate();
  const { user, logout } = useAuth();
  const notify = useNotify();

  const menuRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    const menuEl = menuRef.current;
    const buttonEl = menuButtonRef.current;

    if (menuEl && buttonEl) {
      menuEl.anchorElement = buttonEl;
      menuEl.show();
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      notify(ENotifyType.ERROR, error.message);
    }
  }

  return (
    <>
      <md-top-app-bar class="custom-top-bar">
        <div slot="title" className="app-title">
          Bem vindo { user?.firstName ? user.firstName : '' }
        </div>

         <md-icon-button ref={menuButtonRef} slot="navigation" onClick={openMenu}>
          <md-icon>menu</md-icon>
        </md-icon-button>
      </md-top-app-bar>

      <md-menu
        ref={menuRef}
        corner="BOTTOM_START"
      >
        <md-menu-item onClick={() => navigate(ERoutes.PROFILE)}>
          <md-icon slot="start">edit</md-icon>
          Editar perfil
        </md-menu-item>
        <md-menu-item onClick={handleLogout}>
          <md-icon slot="start">logout</md-icon>
          Logout
        </md-menu-item>
      </md-menu>
    </>
  );
}
