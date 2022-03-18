import { useAtom } from "jotai";
import Link from "next/link";
import { showNewPostModalAtom, userAtom } from "store";
import { FSocietyMaskIcon, LampIcon, SignOutIcon } from "components/icons";
import { navItems, navItem, text } from "../header.module.scss";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NewPostModal from "components/NewPostModal";

const LoggedInNav = () => {
  const router = useRouter();
  const [showNewPostModal, setShowNewPostModal] = useAtom(showNewPostModalAtom);
  const [user, setUser] = useAtom(userAtom);

  const handleDisconnect = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/');
  }

  return (
    <>
      {showNewPostModal && <NewPostModal />}
      <ul className={navItems} role="navigation">
        <li>
          <button
            className={navItem}
            aria-label="Créer un nouveau snippet."
            onClick={() => setShowNewPostModal(true)}
          >
            <LampIcon />
            <span className={text}>Nouveau Snippet</span>
          </button>
        </li>
        <li>
          <Link href="#">
            <a className={navItem} aria-label="Accéder à la page de mon compte.">
              <FSocietyMaskIcon />
              <span className={text}>{user.username}</span>
            </a>
          </Link>
        </li>
        <li>
          <button
            className={navItem}
            aria-label="Bouton de déconnexion"
            onClick={handleDisconnect}
          >
            <SignOutIcon />
            <span className={text}>Me déconnecter</span>
          </button>
        </li>
      </ul>
    </>
  );
};

export default LoggedInNav;