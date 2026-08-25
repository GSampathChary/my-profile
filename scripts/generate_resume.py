from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "resume.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

PORTFOLIO_BASE_URL = "http://localhost:3000"

profile = {
    "name": "Gannoju Sampath Chary",
    "headline": "Python AI Engineer | Data Scientist | Computer Vision | FastAPI | TensorFlow | PostgreSQL",
    "summary": (
        "Python AI Engineer with 1.10+ years of hands-on experience building machine learning, computer vision, mobile, web, and backend systems. "
        "Experienced across Python, TypeScript, SQL, TensorFlow, PyTorch, OpenCV, FastAPI, Spring Boot, PostgreSQL, TensorFlow Lite, and ONNX Runtime, with practical ownership across "
        "data preparation, exploratory analysis, feature engineering, model training, evaluation, deployment, and production support."
    ),
    "location": "Hyderabad, Telangana, India",
    "email": "gsampathchary454@gmail.com",
    "linkedin": "linkedin.com/in/sampath-chary-3346a7233",
    "github": "github.com/GSampathChary",
    "portfolio": PORTFOLIO_BASE_URL,
}

experience = {
    "company": "ICAR - Indian Institute of Rice Research (IIRR), Hyderabad",
    "role": "Young Professional - I (AI & Full Stack Developer)",
    "duration": "December 2024 - Present",
    "responsibilities": [
        "Develop and maintain Python-based AI, web, and backend applications for agricultural research workflows.",
        "Build production mobile experiences with Flutter and web experiences with React.js and Next.js.",
        "Design FastAPI and Spring Boot services for authentication, predictions, feedback, and workflow orchestration.",
        "Collect, clean, preprocess, annotate, and augment domain datasets for model development and validation.",
        "Perform exploratory data analysis, feature engineering, and dataset quality checks before training.",
        "Train, validate, and optimize deep learning models for image classification and computer vision use cases.",
        "Integrate AI models using TensorFlow, PyTorch, TFLite, and ONNX Runtime for mobile and server inference.",
        "Design PostgreSQL data models and role-based workflows for scientists, admins, and end users.",
        "Collaborate with subject-matter experts for ground-truth validation, evaluation, and iteration.",
        "Deploy applications and backend services and support production releases and debugging.",
    ],
}

projects = [
    {
        "name": "RAISE",
        "tagline": "Rice AI Stress Evaluator",
        "ui": "/projects/raise",
        "live": "https://play.google.com/store/apps/details?id=com.iirr.smart_paddy",
        "stack": "Flutter | TensorFlow | Spring Boot | Python | PostgreSQL | TFLite | ONNX Runtime",
        "description": (
            "Production AI platform for identifying biotic and abiotic rice crop stresses using image-based diagnosis. "
            "Includes mobile AI inference, scientist/admin portal, expert validation, role-based access, prediction history, multilingual UI, and offline inference."
        ),
    },
    {
        "name": "VistaraAI",
        "tagline": "AI-powered PVC interior design assistant",
        "ui": "/projects/vistara-ai",
        "live": "https://vistara-ai-pvc-interior-studio-xi.vercel.app/",
        "backend": "https://vistaraai-pvc-interior-studio.onrender.com",
        "stack": "Next.js | TypeScript | React | FastAPI | Python | LangChain | LangGraph | PostgreSQL",
        "description": (
            "Production-ready full-stack AI platform for PVC kitchen cupboards, wardrobes, TV units, and custom interiors. "
            "Combines grounded knowledge retrieval, assistant workflows, computer vision insights, geo-targeted SEO, and lead capture support."
        ),
    },
    {
        "name": "RiceGPT AI",
        "tagline": "Agricultural AI assistant concept",
        "ui": "/projects/ricegpt",
        "live": "https://quiet-sun-da4e.gsampathchary454.workers.dev/",
        "backend": "https://ricegpt-ai-copilot.onrender.com",
        "stack": "Next.js | TypeScript | React",
        "description": "Domain AI assistant concept for agricultural and rice-related queries, pairing a structured knowledge base with a public web deployment.",
    },
    {
        "name": "ResumeAI Pro",
        "tagline": "AI resume optimization concept",
        "ui": "/projects/resumeai",
        "live": "https://resume-ai-pro-beryl.vercel.app/",
        "backend": "https://resumeai-pro-5yon.onrender.com",
        "stack": "Next.js | TypeScript | React | Tailwind CSS | FastAPI",
        "description": "AI-assisted resume analysis and refinement concept focused on recruiter-friendly guidance and practical deployment.",
    },
    {
        "name": "Interview Copilot AI",
        "tagline": "Interview preparation companion",
        "ui": "/projects/interview-copilot",
        "live": "https://interview-copilot-ai-ten.vercel.app/",
        "backend": "https://interview-copilot-ai-mjgj.onrender.com",
        "stack": "React | TypeScript | Prompt Engineering",
        "description": "Interview preparation companion for technical question practice, answer structuring, and confidence building.",
    },
    {
        "name": "DataInsight AI",
        "tagline": "AI data analysis concept",
        "ui": "/projects/datainsight",
        "live": "https://data-insight-ai-dywd.vercel.app/",
        "backend": "https://datainsight-ai-18xr.onrender.com",
        "stack": "Python | Next.js | TypeScript | Data Visualization",
        "description": "AI-assisted exploratory data analysis concept for pattern discovery, summary reporting, and decision support.",
    },
    {
        "name": "AutoML Studio",
        "tagline": "Automated ML workflow concept",
        "ui": "/projects/automl-studio",
        "live": "https://auto-ml-studio-lilac.vercel.app/",
        "backend": "https://automl-studio-1lw6.onrender.com",
        "stack": "Python | FastAPI | Scikit-learn | Next.js | Gemini",
        "description": "End-to-end automated machine learning concept for dataset upload, preprocessing, training, comparison, and evaluation.",
    },
]

skills = {
    "Languages": "Python, SQL, JavaScript, Java, Dart",
    "AI / ML": "TensorFlow, PyTorch, Scikit-learn, Keras, ONNX Runtime, TensorFlow Lite, OpenCV",
    "Data Science": "Pandas, NumPy, Exploratory Data Analysis, Feature Engineering, Statistics, Model Evaluation",
    "Backend & APIs": "FastAPI, Spring Boot, REST APIs, Microservices",
    "Frontend & Apps": "Flutter, React.js, Next.js, HTML5, CSS3",
    "Database & Delivery": "PostgreSQL, MySQL, Firebase, Docker, Google Colab, Google Play Console",
    "Tools": "Git, GitHub, Postman, VS Code, Linux",
}

education = {
    "degree": "B.Tech, Computer Science",
    "year": "2019 - 2023",
    "college": "Gurunanak Institutions Technical Campus, Hyderabad, Telangana",
}

achievements = [
    "Delivered an end-to-end AI application spanning dataset preparation, model training, mobile/web development, backend APIs, database design, deployment, and maintenance.",
    "Published the RAISE IIRR Android application on the Google Play Store.",
    "Built a multi-role AI platform connecting farmers, scientists, administrators, and expert reviewers through a single application ecosystem.",
    "Developed model-deployment workflows supporting both offline mobile inference and online server inference.",
    "Built reusable backend and AI-service architecture using Spring Boot, FastAPI, PostgreSQL, and Python.",
]

additional_project = {
    "name": "Rice Clinic",
    "stack": "Flutter | Localization | Image Matching | Google Apps Script | Google Sheets",
    "description": (
        "Multilingual rice advisory application for diseases, pests, weeds, nutrient deficiencies, cultivation practices, "
        "and fertilizer/spray recommendations."
    ),
}


def p(text, style):
    return Paragraph(text, style)


def link(url, label=None):
    label = label or url
    href = url if url.startswith("http") else f"{PORTFOLIO_BASE_URL}{url}"
    return f'<link href="{href}">{label}</link>'


def bullet_list(items, style, bullet_color="#7dd3fc"):
    return [Paragraph(f"- {item}", style) for item in items]


def section_title(text, styles):
    bar = Table(
        [[Paragraph(text.upper(), styles["Section"])], [""]],
        colWidths=[7.2 * inch],
        rowHeights=[0.25 * inch, 0.05 * inch],
    )
    bar.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f172a")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#dbeafe")),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, 0), 10),
                ("ALIGN", (0, 0), (-1, 0), "LEFT"),
                ("VALIGN", (0, 0), (-1, 0), "MIDDLE"),
                ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#38bdf8")),
                ("LINEBELOW", (0, 1), (-1, 1), 0, colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return bar


def card_table(left, right=None, styles=None):
    values = [[p(left, styles["Body"]), p(right, styles["Body"])] if right else [p(left, styles["Body"])]]
    tbl = Table(values, colWidths=[3.55 * inch, 3.55 * inch] if right else [7.1 * inch])
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0b1220")),
                ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#1f2937")),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#1f2937")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return tbl


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#050816"))
    canvas.rect(0, 0, letter[0], letter[1], stroke=0, fill=1)
    canvas.setStrokeColor(colors.HexColor("#1f2937"))
    canvas.line(doc.leftMargin, 0.65 * inch, letter[0] - doc.rightMargin, 0.65 * inch)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#94a3b8"))
    canvas.drawString(doc.leftMargin, 0.45 * inch, "AI Engineer Lab Resume")
    canvas.drawRightString(letter[0] - doc.rightMargin, 0.45 * inch, f"Page {canvas.getPageNumber()}")
    canvas.restoreState()


def build():
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="Name", fontName="Helvetica-Bold", fontSize=22, leading=24, textColor=colors.white))
    styles.add(ParagraphStyle(name="Headline", fontName="Helvetica", fontSize=11, leading=14, textColor=colors.HexColor("#cbd5e1")))
    styles.add(ParagraphStyle(name="Body", fontName="Helvetica", fontSize=9.5, leading=13, textColor=colors.HexColor("#e2e8f0")))
    styles.add(ParagraphStyle(name="Small", fontName="Helvetica", fontSize=8.5, leading=11, textColor=colors.HexColor("#cbd5e1")))
    styles.add(ParagraphStyle(name="Section", fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=colors.HexColor("#dbeafe")))
    styles.add(ParagraphStyle(name="CardTitle", fontName="Helvetica-Bold", fontSize=11, leading=13, textColor=colors.white))

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.75 * inch,
        title=profile["name"],
        author=profile["name"],
    )

    story = []

    portfolio_link = link(profile["portfolio"], profile["portfolio"])
    raise_link = link("/projects/raise", "RAISE Story")
    raise_live = link(projects[0]["live"], "RAISE App")
    projects_link = link("/projects", "Projects UI")
    email_link = link(f"mailto:{profile['email']}", profile["email"])
    linkedin_link = link(f"https://{profile['linkedin']}", profile["linkedin"])
    github_link = link(f"https://{profile['github']}", profile["github"])

    hero = Table(
        [
            [
                Paragraph(profile["name"], styles["Name"]),
                Paragraph(f"{portfolio_link} &nbsp; | &nbsp; {raise_link} &nbsp; | &nbsp; {raise_live} &nbsp; | &nbsp; {projects_link}", styles["Small"]),
            ],
            [
                Paragraph(profile["headline"], styles["Headline"]),
                Paragraph(f'{profile["location"]}<br/>{email_link}<br/>{linkedin_link}<br/>{github_link}', styles["Small"]),
            ],
        ],
        colWidths=[4.7 * inch, 2.4 * inch],
    )
    hero.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#020617")),
                ("BOX", (0, 0), (-1, -1), 1, colors.HexColor("#1e293b")),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(hero)
    story.append(Spacer(1, 0.18 * inch))

    story.append(section_title("Professional Summary", styles))
    story.append(Spacer(1, 0.08 * inch))
    story.append(Paragraph(profile["summary"], styles["Body"]))
    story.append(Spacer(1, 0.12 * inch))

    story.append(section_title("Core Competencies", styles))
    story.append(Spacer(1, 0.08 * inch))
    comp_table = Table(
        [
            [Paragraph("<b>AI / Machine Learning</b>", styles["Small"]), Paragraph("<b>Backend & APIs</b>", styles["Small"])],
            [Paragraph("Computer Vision, model training, deployment, optimization", styles["Small"]), Paragraph("Spring Boot, FastAPI, REST APIs, microservices", styles["Small"])],
            [Paragraph("<b>Full Stack</b>", styles["Small"]), Paragraph("<b>Data & Delivery</b>", styles["Small"])],
            [Paragraph("Flutter, React.js, Next.js, UI implementation", styles["Small"]), Paragraph("PostgreSQL, dataset prep, release support", styles["Small"])],
        ],
        colWidths=[3.45 * inch, 3.45 * inch],
    )
    comp_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0b1220")),
                ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#1f2937")),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#1f2937")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(comp_table)
    story.append(Spacer(1, 0.14 * inch))

    story.append(section_title("Technical Skills", styles))
    story.append(Spacer(1, 0.08 * inch))
    skill_rows = []
    for k, v in skills.items():
        skill_rows.append([Paragraph(f"<b>{k}</b>", styles["Small"]), Paragraph(v, styles["Small"])])
    skill_table = Table(skill_rows, colWidths=[1.3 * inch, 5.8 * inch])
    skill_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0b1220")),
                ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#1f2937")),
                ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#1f2937")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(skill_table)
    story.append(Spacer(1, 0.14 * inch))

    story.append(section_title("Professional Experience", styles))
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        card_table(
            f'<b>{experience["role"]}</b><br/>{experience["company"]}<br/>{experience["duration"]}',
            "AI-powered mobile, web, and backend applications for agricultural research.",
            styles=styles,
        )
    )
    story.append(Spacer(1, 0.08 * inch))
    story.extend(bullet_list(experience["responsibilities"], styles["Small"]))
    story.append(Spacer(1, 0.12 * inch))

    story.append(section_title("Flagship Project - RAISE", styles))
    story.append(Spacer(1, 0.08 * inch))
    raise_card = Table(
        [
            [
                Paragraph(
                    f'<b>RAISE</b><br/>Rice AI Stress Evaluator<br/>{link("/projects/raise", "Project Story")}<br/>{link(projects[0]["live"], "Open App")}',
                    styles["Small"],
                ),
                Paragraph(
                    "Flutter | TensorFlow | Spring Boot | Python | PostgreSQL | TFLite | ONNX Runtime<br/><br/>"
                    "AI-powered image-based platform for identifying biotic and abiotic rice crop stresses, combining mobile inference, "
                    "server-side AI services, scientist validation, and structured agricultural data management.",
                    styles["Small"],
                ),
            ]
        ],
        colWidths=[2.7 * inch, 4.4 * inch],
    )
    raise_card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0b1220")),
                ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#1f2937")),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(raise_card)
    story.append(Spacer(1, 0.08 * inch))
    story.extend(
        bullet_list(
            [
                "Developed the Flutter Android application with image capture, crop-stress scanning, prediction history, offline inference, multilingual support, and farmer-focused workflows.",
                "Built the React.js scientist/admin portal and Spring Boot backend with REST APIs for authentication, predictions, expert review, data management, and administration.",
                "Integrated FastAPI-based Python AI services with TensorFlow/PyTorch models for server-side image inference.",
                "Trained and evaluated image-classification models including EfficientNetV2, EfficientNetV1, ResNet, MobileNet, and InceptionNet; explored YOLOv5 and YOLOv8 for computer-vision workflows.",
                "Converted and optimized models for lightweight inference using TensorFlow Lite and ONNX Runtime.",
                "Implemented Farmer, Scientist, and Admin roles, including expert review for visually confusing cases and feedback-driven model improvement.",
                "Designed PostgreSQL data models for users, predictions, review workflows, and application history.",
            ],
            styles["Small"],
        )
    )

    story.append(PageBreak())
    story.append(section_title("Personal Projects", styles))
    story.append(Spacer(1, 0.08 * inch))
    for project in projects:
        live_text = link(project["live"], "Open live experience") if project.get("live") else "No live link"
        backend_text = link(project["backend"], "Backend API") if project.get("backend") else "No backend link"
        card = Table(
            [
                [
                    Paragraph(
                        f'<b>{project["name"]}</b><br/>{project["tagline"]}<br/>{link(project["ui"], "Project Story")}',
                        styles["Small"],
                    ),
                    Paragraph(
                        f'{project["stack"]}<br/>{live_text}<br/>{backend_text}<br/><br/>{project["description"]}',
                        styles["Small"],
                    ),
                ]
            ],
            colWidths=[2.6 * inch, 4.5 * inch],
        )
        card.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#0b1220")),
                    ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#1f2937")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 9),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            )
        )
        story.append(card)
        story.append(Spacer(1, 0.08 * inch))

    story.append(section_title("Additional Project Experience", styles))
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        card_table(
            f'<b>{additional_project["name"]}</b><br/>{additional_project["stack"]}',
            additional_project["description"],
            styles=styles,
        )
    )
    story.append(Spacer(1, 0.12 * inch))

    story.append(section_title("Key Achievements", styles))
    story.append(Spacer(1, 0.08 * inch))
    story.extend(bullet_list(achievements, styles["Small"]))
    story.append(Spacer(1, 0.12 * inch))

    story.append(section_title("Education", styles))
    story.append(Spacer(1, 0.08 * inch))
    story.append(
        card_table(
            f'<b>{education["degree"]}</b><br/>{education["year"]}<br/>{education["college"]}',
            "University not explicitly specified in the current resume source.",
            styles=styles,
        )
    )
    story.append(Spacer(1, 0.12 * inch))

    story.append(
        Paragraph(
            f'Portfolio: {link(profile["portfolio"], profile["portfolio"])} &nbsp; | &nbsp; '
            f'Projects: {link("/projects", "/projects")} &nbsp; | &nbsp; '
            f'Experience: {link("/experience", "/experience")} &nbsp; | &nbsp; '
            f'Resume: {link("/resume/resume.pdf", "/resume/resume.pdf")}',
            styles["Small"],
        )
    )

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    build()
