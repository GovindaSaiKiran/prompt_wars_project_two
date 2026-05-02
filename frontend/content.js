const electionData = {
  phases: [
    {
      id: "notification",
      title: "Notification",
      timeline: "Election Commission issues official notification",
      description:
        "The Election Commission of India issues a formal notification announcing the schedule for elections. This marks the official start of the election process.",
      keyDetails: [
        "Gazette notification is published",
        "Election dates are officially announced",
        "Key events and phases declared",
      ],
    },
    {
      id: "nomination",
      title: "Filing Nominations",
      timeline: "Candidates submit nomination papers",
      description:
        "Eligible candidates file their nomination papers with the Returning Officer. Each candidate must submit required documents, security deposit, and a signed affidavit declaring their criminal record, assets, liabilities, and educational qualifications.",
      keyDetails: [
        "Candidates must submit Form 2B nomination paper",
        "Security deposit required (varies by election type)",
        "Affidavit with criminal, financial, and educational details",
        "Proposers from the constituency must support the nomination",
      ],
    },
    {
      id: "scrutiny",
      title: "Scrutiny of Nominations",
      timeline: "Returning Officer examines nomination papers",
      description:
        "The Returning Officer scrutinizes all nominations on the day after the last date of filing. Candidates can object to other nominations, and the officer decides on the validity of each nomination.",
      keyDetails: [
        "Checking completeness and correctness of papers",
        "Objections can be raised by candidates",
        "Returning Officer's decision is final but can be challenged in court",
        "Invalid nominations are rejected with reasons",
      ],
    },
    {
      id: "withdrawal",
      title: "Withdrawal of Candidature",
      timeline: "Candidates can withdraw their nominations",
      description:
        "Candidates who filed valid nominations but do not wish to contest can withdraw their candidature within two days of scrutiny. This finalizes the list of contesting candidates.",
      keyDetails: [
        "Only valid nominees can withdraw",
        "Withdrawal must be in prescribed form",
        "Security deposit is forfeited if withdrawn after this period",
        "Final list of candidates is prepared",
      ],
    },
    {
      id: "campaigning",
      title: "Campaigning Period",
      timeline: "Candidates appeal for votes",
      description:
        "Candidates and political parties campaign to win votes through rallies, advertisements, door-to-door visits, and public meetings. The Model Code of Conduct is in force during this period.",
      keyDetails: [
        "Model Code of Conduct enforced",
        "Expenditure limits apply (varies by state/UT)",
        "Campaign ends 48 hours before polling (Silence Period)",
        "Social media and digital campaigns are regulated",
      ],
    },
    {
      id: "polling",
      title: "Polling Day",
      timeline: "Voters cast their votes",
      description:
        "Voters exercise their franchise using Electronic Voting Machines (EVMs) at designated polling stations. Voting typically occurs in multiple phases for national and large state elections.",
      keyDetails: [
        "Multiple phases for large elections to ensure security",
        "EVMs with VVPAT (Voter Verifiable Paper Audit Trail) are used",
        "NOTA (None of the Above) option available",
        "Polling stations open 7 AM to 6 PM (varies)",
        "Security deployed to ensure free and fair voting",
      ],
    },
    {
      id: "counting",
      title: "Counting of Votes",
      timeline: "Votes are counted and results tabulated",
      description:
        "After polling concludes, votes are counted at designated counting centers. The process is transparent, with counting agents from candidates present to observe.",
      keyDetails: [
        "Counting begins after all phases are complete",
        "Counting agents from candidates observe the process",
        "VVPAT slips from 5 random EVMs per constituency are verified",
        "Postal ballots are counted first in some cases",
        "Trends and leads announced, final results declared",
      ],
    },
    {
      id: "results",
      title: "Declaration of Results",
      timeline: "Winners announced and gazetted",
      description:
        "The Election Commission officially declares the winners. The winning candidate receives a certificate of election and the results are published in the Official Gazette.",
      keyDetails: [
        "Winners receive Certificate of Election (Form 22)",
        "Results published in Official Gazette",
        "Disputes can be challenged through election petitions in courts",
        "Winning party/alliance proceeds to form government",
      ],
    },
    {
      id: "governmentFormation",
      title: "Government Formation",
      timeline: "New government takes oath",
      description:
        "The party or alliance with a majority stakes claim to form the government. The Governor (for states) or President (for center) invites the leader to take oath as Chief Minister or Prime Minister.",
      keyDetails: [
        "Majority party/alliance stakes claim",
        "Oath ceremony organized",
        "Council of Ministers appointed",
        "First session of new assembly/parliament convened",
      ],
    },
  ],

  glossary: [
    {
      term: "ECI",
      full: "Election Commission of India",
      meaning:
        "An autonomous constitutional authority responsible for administering election processes in India. It oversees elections to the Lok Sabha, Rajya Sabha, State Legislative Assemblies, and the offices of the President and Vice President.",
    },
    {
      term: "EVM",
      full: "Electronic Voting Machine",
      meaning:
        "An electronic device used to record votes in Indian elections. It consists of a Control Unit (with polling officer) and a Balloting Unit (for voters). First used in 1982 and now standard across India.",
    },
    {
      term: "VVPAT",
      full: "Voter Verifiable Paper Audit Trail",
      meaning:
        "A device attached to EVMs that prints a paper slip visible to the voter through a window, showing the candidate and party they voted for. The slip drops into a sealed box for audit and verification.",
    },
    {
      term: "MCC",
      full: "Model Code of Conduct",
      meaning:
        "A set of guidelines issued by the Election Commission that political parties and candidates must follow during elections. It regulates behavior, speeches, advertisements, and ensures a level playing field.",
    },
    {
      term: "NOTA",
      full: "None of the Above",
      meaning:
        "An option on EVMs introduced in 2013 that allows voters to reject all candidates if they find none suitable. While votes are counted, NOTA results do not affect the outcome of the election.",
    },
    {
      term: "Returning Officer",
      full: "Returning Officer (RO)",
      meaning:
        "A senior government officer appointed for each constituency who oversees the conduct of elections. The RO accepts nominations, scrutinizes them, conducts polling, supervises counting, and declares results.",
    },
    {
      term: "Delimitation",
      full: "Delimitation Commission",
      meaning:
        "A body that redraws the boundaries of parliamentary and assembly constituencies based on the latest census data to ensure equal population representation. Last conducted in India in 2009.",
    },
  ],

  faq: [
    {
      q: "Who is eligible to vote in India?",
      a: "Any Indian citizen who is 18 years or older, of sound mind, and not disqualified under any law can vote. You must be registered in the electoral roll of your constituency.",
    },
    {
      q: "How do I register to vote?",
      a: "You can apply online via the NVSP portal (nvsp.in) or Voter Helpline App. You can also submit Form 6 to the Electoral Registration Officer of your constituency. Documents required include age and residence proof.",
    },
    {
      q: "What is the Model Code of Conduct?",
      a: "The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission for political parties and candidates during elections. It ensures fair play and prevents the misuse of official power.",
    },
    {
      q: "What is an EVM and VVPAT?",
      a: "EVM stands for Electronic Voting Machine, used to cast votes electronically. VVPAT (Voter Verifiable Paper Audit Trail) is a device attached to EVMs that prints a paper slip showing your vote, visible for 7 seconds before dropping into a sealed box.",
    },
    {
      q: "Can I vote if I am outside my constituency on polling day?",
      a: "Yes, through the Electronically Transmitted Postal Ballot System (ETPBS), certain categories like service voters and government employees posted outside can vote by postal ballot. However, ordinary voters cannot vote outside their constituency.",
    },
    {
      q: "What happens if there is a tie in votes?",
      a: "In case of a tie, the Returning Officer decides the winner by drawing lots (like a coin toss or lottery), as per the Representation of the People Act, 1951.",
    },
    {
      q: "How long is the tenure of Lok Sabha and State Assemblies?",
      a: "The normal tenure is five years from the date of its first meeting, unless dissolved earlier. Elections must be held within six months before the expiry of the term.",
    },
    {
      q: "What is NOTA?",
      a: "NOTA (None of the Above) is an option on EVMs that allows voters to reject all candidates. Introduced in 2013, it empowers voters who find none of the candidates suitable.",
    },
    {
      q: "Who appoints the Election Commission?",
      a: "The President of India appoints the Chief Election Commissioner and other Election Commissioners. They have a fixed tenure and can only be removed through impeachment, similar to a Supreme Court judge.",
    },
    {
      q: "What is a By-election?",
      a: "A by-election is held to fill a vacancy caused by the death, resignation, or disqualification of a sitting member. It is conducted only for the specific vacant seat, not for the entire house.",
    },
  ],

  quiz: [
    {
      question: "What is the minimum age to vote in India?",
      options: ["16 years", "18 years", "21 years", "25 years"],
      answer: 1,
      explanation:
        "The minimum voting age in India is 18 years. This was lowered from 21 to 18 by the 61st Constitutional Amendment Act, 1988.",
    },
    {
      question: "Which body conducts elections in India?",
      options: [
        "Supreme Court",
        "Parliament",
        "Election Commission of India",
        "President of India",
      ],
      answer: 2,
      explanation:
        "The Election Commission of India (ECI) is the constitutional authority responsible for administering elections in India.",
    },
    {
      question: "What does EVM stand for?",
      options: [
        "Electronic Vote Machine",
        "Electronic Voting Machine",
        "Electoral Vote Mechanism",
        "Election Verification Machine",
      ],
      answer: 1,
      explanation:
        "EVM stands for Electronic Voting Machine, which is used to record votes in Indian elections.",
    },
    {
      question: "When is the Model Code of Conduct enforced?",
      options: [
        "On polling day only",
        "48 hours before polling",
        "When the Election Commission announces election dates",
        "After results are declared",
      ],
      answer: 2,
      explanation:
        "The Model Code of Conduct comes into force as soon as the Election Commission announces the election schedule.",
    },
    {
      question: "What is the maximum tenure of Lok Sabha?",
      options: ["3 years", "4 years", "5 years", "6 years"],
      answer: 2,
      explanation:
        "The normal tenure of the Lok Sabha and State Legislative Assemblies is 5 years, unless dissolved earlier.",
    },
    {
      question: "What does VVPAT stand for?",
      options: [
        "Voter Verified Paper Audit Trail",
        "Voter Verifiable Paper Audit Trail",
        "Vote Verification Paper Audit Trail",
        "Voting Verified Public Audit Trail",
      ],
      answer: 1,
      explanation:
        "VVPAT stands for Voter Verifiable Paper Audit Trail. It prints a paper slip visible to the voter for verification.",
    },
    {
      question: "What is NOTA?",
      options: [
        "National Organizing Team Association",
        "None of the Above",
        "National Officer Training Academy",
        "None of These Answers",
      ],
      answer: 1,
      explanation:
        "NOTA stands for 'None of the Above.' It allows voters to reject all candidates if they find none suitable.",
    },
    {
      question:
        "Who decides the winner in case of a tie in votes?",
      options: [
        "The President",
        "The Returning Officer by draw of lots",
        "The Election Commission",
        "Re-election is held",
      ],
      answer: 1,
      explanation:
        "In case of a tie, the Returning Officer decides the winner by drawing lots.",
    },
    {
      question: "Which form is used for voter registration?",
      options: ["Form 2B", "Form 6", "Form 8", "Form 22"],
      answer: 1,
      explanation:
        "Form 6 is used to apply for inclusion of name in the electoral roll. Form 2B is for nominations, Form 8 for corrections, and Form 22 is the Certificate of Election.",
    },
    {
      question:
        "Can a person vote in any constituency if they are registered elsewhere?",
      options: [
        "Yes, with special permission",
        "No, only in the constituency where registered",
        "Yes, using postal ballot",
        "Only in Delhi",
      ],
      answer: 1,
      explanation:
        "A voter can only vote in the polling station of the constituency where they are registered. Postal ballots are available only for specific categories like service voters.",
    },
    {
      question: "What is a By-election?",
      options: [
        "Election for the entire house",
        "Election for a single vacant seat",
        "Election for the President",
        "A mock election",
      ],
      answer: 1,
      explanation:
        "A by-election is held to fill a vacancy caused by death, resignation, or disqualification of a sitting member.",
    },
    {
      question: "How many phases can general elections have?",
      options: [
        "Only 1",
        "Always 7",
        "Depends on security and logistics",
        "Maximum 3",
      ],
      answer: 2,
      explanation:
        "National and large state elections can be held in multiple phases depending on security, logistics, and administrative considerations.",
    },
    {
      question: "Who appoints the Chief Election Commissioner?",
      options: [
        "Prime Minister",
        "President of India",
        "Chief Justice of India",
        "Parliament",
      ],
      answer: 1,
      explanation:
        "The President of India appoints the Chief Election Commissioner. The CEC can only be removed through impeachment like a Supreme Court judge.",
    },
    {
      question: "What does Delimitation mean?",
      options: [
        "Counting votes",
        "Redrawing constituency boundaries",
        "Announcing results",
        "Appointing officers",
      ],
      answer: 1,
      explanation:
        "Delimitation is the process of redrawing the boundaries of parliamentary and assembly constituencies to ensure equal population representation.",
    },
    {
      question: "Which of these is NOT a feature of Indian elections?",
      options: [
        "Universal adult franchise",
        "Compulsory voting",
        "Secret ballot",
        "First-past-the-post system",
      ],
      answer: 1,
      explanation:
        "Voting in India is not compulsory; it is voluntary. India follows universal adult franchise, secret ballot, and the first-past-the-post electoral system.",
    },
  ],
};

