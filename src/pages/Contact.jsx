import ContactSection from "../components/contact/ContactSection";
import SupportSection from "../components/contact/SupportSection";


const Contact = () => {
  return (
    <div className="pt-20 bg-linear-to-t from-white to-cyan-100">
      <ContactSection />
      <SupportSection/>
    </div>
  );
};

export default Contact;
