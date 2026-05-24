import { useState } from "react";
import styles from "./faqSection.module.css";

const faqData = [
  {
    question: "Do I need previous jet ski experience?",
    answer:
      "No previous experience is required. We provide clear instructions and safety guidance before every ride.",
  },
  {
    question: "How many people can ride on one jet ski?",
    answer:
      "One or two people can ride on one jet ski, depending on the package you choose during booking.",
  },
  {
    question: "What should I bring with me?",
    answer:
      "We recommend bringing swimwear, a towel, sunscreen, and arriving with enough time before your booking.",
  },
  {
    question: "How early should I arrive?",
    answer:
      "It is best to arrive at least 10–15 minutes before your scheduled booking so we can complete the check-in and briefing process smoothly.",
  },
  {
    question: "What happens if weather conditions are bad?",
    answer:
      "If weather conditions are not safe for riding, we may reschedule your booking or offer another suitable solution.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes. You can request a cancellation through the website, and the AstroJets team will review it. Rescheduling depends on availability.",
  },
  {
    question: "Is safety equipment provided?",
    answer:
      "Yes. All necessary safety equipment is provided before the ride.",
  },
  {
    question: "Where exactly are you located?",
    answer:
      "You can find us across the road from Fellachidis Bakery in Nea Peramos, and the exact location is also shown in the Contact section of the website.",
  },
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={styles.faqItem}>
      <button className={styles.faqQuestion} onClick={onClick} type="button">
        <span>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}>
          +
        </span>
      </button>

      {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
    </div>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="faq" className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Before You Ride</h2>
        <p className={styles.subtitle}>
          Everything you may want to know before booking your AstroJets
          experience.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqData.map((item, index) => (
          <FaqItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FaqSection;