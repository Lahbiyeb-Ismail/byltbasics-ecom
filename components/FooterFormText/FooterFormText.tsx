import classes from "./FooterFormText.module.scss";

/**
 * Renders the footer form text component.
 *
 * @returns The JSX element representing the footer form text component.
 */
function FooterFormText() {
  return (
    <div className={classes.footer__form_text}>
      <h2>save up to</h2>
      <h1>20% off</h1>
    </div>
  );
}

export default FooterFormText;
