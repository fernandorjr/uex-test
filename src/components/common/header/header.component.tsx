// @ts-nocheck
import { useRef } from 'react';
import './header.style.css';
import { useNavigate } from '@/hooks';
import { ERoutes } from '@/tokens/routes';

export default function Header() {
  const { navigate } = useNavigate();

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

  return (
    <>
      <md-top-app-bar class="custom-top-bar">
        <div slot="title" className="app-title">
          Bem vindo - Fernando
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
        <md-menu-item onClick={() => navigate(ERoutes.LOGIN)}>
          <md-icon slot="start">logout</md-icon>
          Logoff
        </md-menu-item>
      </md-menu>
    </>
  );
}
