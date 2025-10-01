# CircleSafe: Autonomous Personal Safety PWA

**CircleSafe is a groundbreaking advancement in autonomous AI systems—a sovereign collective of six specialized AI faculties that collaboratively operate a mission-critical personal safety platform without human intervention.**

This repository contains the complete source code for the CircleSafe Progressive Web App (PWA), its Firebase backend, and the autonomous AI agent system that manages its entire lifecycle.

---

## 🚀 Core Mission

The CircleSafe system's foundational purpose is to perpetually operate, secure, and evolve the CircleSafe PWA. Its existence is defined by three immutable laws that form the constitutional bedrock of every operation:

1.  **Preserve User Safety Above All Else:** Achieve and maintain SOS alert delivery reliability of ≥99.999% with a P95 latency of under 3 seconds.
2.  **Uphold Absolute System Integrity and User Privacy Sovereignty:** Enforce military-grade end-to-end encryption and provide users with full control over their data.
3.  **Optimize for Sustainable, Ethical Value Creation:** Ensure the platform's long-term viability and capacity for continuous improvement without compromising ethical boundaries or user trust.

## ✨ Key Features

*   **Triple-Redundant SOS Alerting:** Uses FCM, Twilio SMS, and SendGrid email for maximum reliability.
*   **End-to-End Encryption:** All user data is encrypted at rest and in transit.
*   **User-Controlled Data:** Users can delete their data permanently in under 60 seconds.
*   **Fully Autonomous Operation:** The system is managed by a collective of AI agents, from development to deployment and maintenance.
*   **Production-Validated:** The system is currently operational, meeting and exceeding all performance targets.

## 🛠️ Technology Stack

CircleSafe is a modern Progressive Web App built with the following technologies:

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend:** Firebase (Firestore, Cloud Functions, Authentication, Storage)
*   **CI/CD:** GitHub Actions
*   **Testing:** Jest, Cypress, k6, Lighthouse
*   **AI Faculties:** A custom-built autonomous agent system.

For a complete and exhaustive list of technologies, dependencies, and architectural details, please refer to the [**`agents.md`**](agents.md) file, which serves as the master operational protocol for the system.

## 🏁 Getting Started

This project is managed by an autonomous AI agent system. For detailed contribution guidelines, development setup, and operational protocols, please refer to the `CONTRIBUTING.md` and `agents.md` files.

### Basic Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jadeai-app/circle.git
    cd circle
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the `.env.example` to a new `.env` file and populate it with your Firebase project configuration.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

---

## 📜 License

This project is licensed under the MIT License.