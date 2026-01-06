'use client';

import { cn } from '@/lib/cn';
import FAQItem from '@/components/common/FAQItem';

export default function FAQSection({
  title = 'Frequently Asked Questions',
  faqs = [],
  className
}) {
  // Default FAQs if none provided
  const defaultFaqs = [
    {
      question: 'Ques. My CUET total score is 280 out of 750, so which colleges should I go to?',
      answer: 'With a CUET score of 280 out of 750, you have several good options. You can consider universities like Delhi University (DU) colleges for general courses, Jamia Millia Islamia, Aligarh Muslim University (AMU), and various central universities across India. The exact college will depend on your preferred course and category. I recommend using the CUET college predictor tool to get personalized college recommendations based on your score, category, and course preferences.',
      author: 'Muskan Agrahari',
      date: '27 Jun 25'
    },
    {
      question: 'Ques. What is the expected rank (AIR) for Sastra University Thanjavur for Biotechnology?',
      answer: 'For Sastra University Thanjavur Biotechnology program, the expected All India Rank (AIR) typically ranges between 8,000 to 15,000 in JEE Main. However, this can vary based on the category (General, OBC, SC, ST) and the specific year. For the general category, a rank around 10,000-12,000 gives you a good chance. The cutoff may be more relaxed for reserved categories. It\'s always recommended to check the official website for the most recent cutoff trends.',
      author: 'Muskan Agrahari',
      date: '27 Jun 25'
    },
    {
      question: 'Ques. How can I apply for BITSAT?',
      answer: 'To apply for BITSAT (Birla Institute of Technology and Science Admission Test), follow these steps:\n\n1. Visit the official BITSAT website (bitsadmission.com)\n2. Register by providing your email ID and mobile number\n3. Fill in the application form with personal and academic details\n4. Upload required documents (photograph, signature)\n5. Pay the application fee online (Rs. 3,400 for male students, Rs. 2,900 for female students)\n6. Book your preferred test slot\n7. Download and save the admit card once released\n\nThe application window typically opens in January and closes in March. Make sure to apply before the deadline.',
      author: 'Muskan Agrahari',
      date: '27 Jun 25'
    },
    {
      question: 'Ques. Which subject is considered for determining the CUET cutoff for admission to HNBGU?',
      answer: 'For Hemvati Nandan Bahuguna Garhwal University (HNBGU) admission through CUET, the cutoff is primarily determined by your domain subject scores along with the General Test score. The specific subjects considered depend on your chosen program:\n\n- For Science programs: Physics, Chemistry, Mathematics/Biology\n- For Arts programs: Relevant humanities subjects\n- For Commerce programs: Accountancy, Economics, Business Studies\n\nThe university calculates merit based on the best performing domain subjects and the General Test. Check the official HNBGU admission brochure for exact subject combinations for your desired course.',
      author: 'Muskan Agrahari',
      date: '27 Jun 25'
    },
    {
      question: 'Ques. VIPS give preference through Cuet 2025 rank',
      answer: 'Yes, Vivekananda Institute of Professional Studies (VIPS), Delhi does give preference to CUET 2025 ranks for admissions. VIPS participates in the centralized CUET-based admission process for undergraduate programs. The admission is purely merit-based on CUET scores.\n\nKey points:\n- Admission is through IPU CET counseling\n- CUET scores are accepted for certain programs\n- Merit is calculated based on CUET domain subject scores\n- Separate cutoffs for different categories (General, OBC, SC, ST, EWS)\n\nMake sure to check the official VIPS website or IPU admission portal for the latest information on CUET-based admissions and cutoff trends.',
      author: 'Vinima Bhola',
      date: '03 Jul 25'
    }
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className={cn('bg-white rounded-xl p-6 border border-gray-200', className)}>
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      {/* FAQ Items */}
      <div>
        {displayFaqs.map((faq, index) => (
          <FAQItem key={index} faq={faq} />
        ))}
      </div>
    </section>
  );
}
