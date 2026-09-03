import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_pdf():
    output_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public', 'Farhan_Khan_Resume.pdf')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Target 1-page letter size (8.5 x 11 in = 612 x 792 pt) with 28pt margins
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=32,
        rightMargin=32,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()
    
    # Custom styles matching the classic resume look
    name_style = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=21,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#000000')
    )
    
    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#222222')
    )
    
    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor('#000000'),
        textTransform='uppercase'
    )
    
    role_title_style = ParagraphStyle(
        'RoleTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.HexColor('#000000')
    )
    
    role_date_style = ParagraphStyle(
        'RoleDate',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#000000')
    )
    
    sub_title_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#222222')
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.2,
        leftIndent=10,
        firstLineIndent=-10,
        textColor=colors.HexColor('#111111')
    )
    
    tech_style = ParagraphStyle(
        'TechSkills',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#111111')
    )

    story = []

    # 1. Header: Name & Contact Info
    story.append(Paragraph("Farhan Khan", name_style))
    story.append(Spacer(1, 2))
    contact_text = '+91 7898330347 &nbsp;|&nbsp; <a href="mailto:farhan47nptl@gmail.com"><u>farhan47nptl@gmail.com</u></a> &nbsp;|&nbsp; <a href="https://www.linkedin.com/in/farhankhanmits"><u>www.linkedin.com/in/farhankhanmits</u></a> &nbsp;|&nbsp; <a href="https://github.com/farhan19121"><u>github.com/farhan19121</u></a>'
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 6))

    # Helper function for Section Heading
    def add_section_header(title):
        story.append(Paragraph(title, section_heading_style))
        story.append(Spacer(1, 1))
        story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor('#000000'), spaceBefore=0, spaceAfter=4))

    # Helper function for Dual Row Header (Title on left, Date on right)
    def make_dual_row(left_para, right_para):
        t = Table([[left_para, right_para]], colWidths=[380, 168])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ]))
        return t

    # --- 2. EXPERIENCE ---
    add_section_header("EXPERIENCE")
    
    # Exp 1
    story.append(make_dual_row(Paragraph("<b>Data Analyst Intern</b>", role_title_style), Paragraph("Sept 2025 – Nov 2025", role_date_style)))
    story.append(Paragraph("<i>Ostwal Group of Industries</i>", sub_title_style))
    story.append(Paragraph("• Cleaned &amp; validated <b>8,000+ production &amp; inventory records</b>, enhancing data consistency for operational reporting", bullet_style))
    story.append(Paragraph("• Performed <b>EDA on production &amp; inventory data</b> to identify trends, &amp; quality issues, supporting senior analysts' reporting", bullet_style))
    story.append(Paragraph("• Collaborated with <b>cross-functional teams</b> to reconcile production and inventory data, improving reporting accuracy", bullet_style))
    story.append(Spacer(1, 3))

    # Exp 2
    story.append(make_dual_row(Paragraph("<b>Web Developer &amp; Data Analytics Associate</b>", role_title_style), Paragraph("Apr 2023 – Apr 2025", role_date_style)))
    story.append(Paragraph("<i>Indian Society for Technical Education Gwalior</i>", sub_title_style))
    story.append(Paragraph("• Developed the ISTE MITS website, managing <b>450+ member records &amp; 10+ technical events</b> through a centralized database", bullet_style))
    story.append(Paragraph("• Validated, cleansed, and de-duplicated <b>500+ records</b>, maintaining 99% data accuracy and improving database integrity", bullet_style))
    story.append(Paragraph("• Built automated Excel dashboards to monitor 450+ member registrations &amp; 8+ event KPIs, <b>reducing reporting time by 40%</b>", bullet_style))
    story.append(Spacer(1, 3))

    # Exp 3
    story.append(make_dual_row(Paragraph("<b>Data Analytics Associate</b>", role_title_style), Paragraph("Apr 2023 – Jan 2024", role_date_style)))
    story.append(Paragraph("<i>Institution of Electronics and Telecommunication Engineers Gwalior</i>", sub_title_style))
    story.append(Paragraph("• Analyzed <b>1,500+ registrations across 20+ technical events</b> to identify engagement patterns &amp; high-value participants", bullet_style))
    story.append(Paragraph("• Performed EDA on registration data, revealing participation trends &amp; event-wise engagement for strategic planning", bullet_style))
    story.append(Spacer(1, 3))

    # Exp 4
    story.append(make_dual_row(Paragraph("<b>Business Analytics Associate</b>", role_title_style), Paragraph("Feb 2024 – Jan 2025", role_date_style)))
    story.append(Paragraph("<i>Startup Cell, MITS Gwalior</i>", sub_title_style))
    story.append(Paragraph("• Analyzed 5+ startup pitches, identifying market gaps &amp; revenue opportunities to support mentorship and funding decisions", bullet_style))
    story.append(Paragraph("• Built 3 Excel/Power BI dashboards tracking startup KPIs, enabling data-driven operational &amp; strategic decisions", bullet_style))
    story.append(Spacer(1, 5))

    # --- 3. PROJECTS ---
    add_section_header("PROJECTS")

    # Proj 1
    story.append(make_dual_row(Paragraph("<b>Impact of Global Conflicts on the Crude Oil Economy</b> | <i>Finance club MITS</i>", role_title_style), Paragraph("May 2026 – June 2026", role_date_style)))
    story.append(Paragraph("• Analyzed India's crude import strategy, highlighting <b>2% to 44% Russian import growth &amp; 15.9% reduction</b> in import costs", bullet_style))
    story.append(Paragraph("• Quantified impact of <b>$10/barrel crude increase on 0.49% inflation &amp; 43 basis point fiscal deficit expansion</b> through modeling", bullet_style))
    story.append(Paragraph("• Developed energy risk mitigation strategies using supplier diversification, strategic sourcing, &amp; layered hedging", bullet_style))
    story.append(Spacer(1, 3))

    # Proj 2
    story.append(make_dual_row(Paragraph("<b>Meridian Autonomous Consumer Intelligence Agent</b> | <i>Self Project</i>", role_title_style), Paragraph("March 2026 – April 2026", role_date_style)))
    story.append(Paragraph("• Developed an autonomous intelligence agent using LangChain and Tavily, synthesizing 8+ sources into analyst reports", bullet_style))
    story.append(Paragraph("• Engineered <b>4-node pipeline</b> (Tracker Classifier Analyst Reporter); classifies each article across 5 dimensions", bullet_style))
    story.append(Paragraph("• Self-reflection node scores completeness on 3 criteria; <b>reduced redundant output by 35%</b> across 15 D2C and FMCG runs", bullet_style))
    story.append(Paragraph("• Deployed via Streamlit; structured output across 4 report sections with markdown and PDF export", bullet_style))
    story.append(Spacer(1, 3))

    # Proj 3
    story.append(make_dual_row(Paragraph("<b>Optimizing Air Travel Through Flight Delay Prediction</b> | <i>Society of Business, MITS</i>", role_title_style), Paragraph("Jan 2026 – Feb 2026", role_date_style)))
    story.append(Paragraph("• Analyzed US flight data to uncover key delay drivers, showing carrier &amp; late aircraft as major controllable disruptions", bullet_style))
    story.append(Paragraph("• Built predictive models (Random Forest) with <b>88% variance explained</b>, enabling forecasts of delay likelihood &amp; duration", bullet_style))
    story.append(Paragraph("• Designed an Operational Adjustability Index to prioritize controllable delays, significantly improving model stability by 8% and providing detailed, actionable recommendations for airlines to proactively <b>reduce delays by 30%</b>", bullet_style))
    story.append(Spacer(1, 3))

    # Proj 4
    story.append(make_dual_row(Paragraph("<b>Digital Lending: Portfolio Optimization</b> | <i>Consulting &amp; Analytics Club, IIT Guwahati</i>", role_title_style), Paragraph("Nov 2025 – Dec 2025", role_date_style)))
    story.append(Paragraph("• Classified <b>3,900 customers</b>, identifying <b>$15.36/transaction margin difference</b> between promotional &amp; organic buyers", bullet_style))
    story.append(Paragraph("• Profiled high-value customers ($82.3 avg spend, 33.7% repeat purchases) into a copy-ready acquisition targeting brief", bullet_style))
    story.append(Paragraph("• Designed phased promotional sunset; projected <b>$4,712 net margin recovery</b> at 25% attrition threshold", bullet_style))
    story.append(Paragraph("• Engineered 9 behavioral features (Engagement Score, Value Tier, Promo Dependency); identified subscription promo correlation redefining loyalty classification.", bullet_style))
    story.append(Spacer(1, 5))

    # --- 4. ACHIEVEMENTS ---
    add_section_header("ACHIEVEMENTS")
    story.append(Paragraph("• Secured <b>9th position in Smart India Hackathon (SIH) 2024</b> among the top 100+ participating teams.", bullet_style))
    story.append(Paragraph("• Led a 5-member team to secure <b>1st Runner-up at HackOrbit 2025</b>, presenting an AI-powered healthcare solution.", bullet_style))
    story.append(Paragraph("• Achieved <b>AIR 8899 in GATE 2026</b>, demonstrating strong engineering aptitude.", bullet_style))
    story.append(Spacer(1, 5))

    # --- 5. EDUCATION ---
    add_section_header("EDUCATION")
    story.append(make_dual_row(
        Paragraph("• <b>Madhav Institute of Technology and Science, Gwalior</b><br/>&nbsp;&nbsp;B.Tech in Electrical Engineering", role_title_style),
        Paragraph("<b>2026</b><br/><b>CGPA: 7.43</b>", role_date_style)
    ))
    story.append(Spacer(1, 5))

    # --- 6. TECHNICAL SKILLS ---
    add_section_header("TECHNICAL SKILLS")
    story.append(Paragraph("<b>Programming:</b> Python, mySQL, PostgreSQL, C++, JavaScript", tech_style))
    story.append(Paragraph("<b>ML Libraries:</b> Scikit-learn, TensorFlow, PyTorch", tech_style))
    story.append(Paragraph("<b>Web Development:</b> HTML, CSS, SCSS, Tailwind, React.js, NEXT.js, Express.js, Django, Flask", tech_style))
    story.append(Paragraph("<b>Tools:</b> Jupyter Notebook, MS excel, Git, GitHub, Docker, Power BI , tableau", tech_style))
    story.append(Paragraph("<b>Concepts:</b> Machine Learning, Deep Learning, Natural Language Processing (NLP), Computer Vision", tech_style))

    doc.build(story)
    print(f"PDF successfully generated at: {output_path}")

if __name__ == '__main__':
    generate_pdf()
