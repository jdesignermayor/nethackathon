/* eslint-disable react/jsx-no-comment-textnodes */
import { Router, useLocation, useRouter } from "wouter";
import MenuOptions from "../../components/MenuOptions";

export default function AdminNestedLayout(props) {
  const router = useRouter();
  const [parentLocation] = useLocation();

  const nestedBase = `${router.base}${props.base}`;

  // don't render anything outside of the scope
  if (!parentLocation.startsWith(nestedBase)) return null;

  return (
    <Router base={nestedBase} key={nestedBase}>
      <div className="grid md:flex">
        <nav className="flex flex-col md:h-screen overflow-y-hidden md:pr-10">
          <MenuOptions />
        </nav>
        <section className="w-full">{props?.children}</section>
      </div>
    </Router>
  );
}