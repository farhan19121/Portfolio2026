from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Project, ProjectBlock

class Command(BaseCommand):
    help = 'Seeds initial verified portfolio data and creates admin user'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE('Starting portfolio data seeding...'))

        # Create or update superuser
        admin_user, created = User.objects.get_or_create(username='FarhanKhan7828')
        admin_user.set_password('SabaSaiyeda')
        admin_user.email = 'admin@farhankhan.dev'
        admin_user.is_staff = True
        admin_user.is_superuser = True
        admin_user.save()
        if created:
            self.stdout.write(self.style.SUCCESS('Created admin user (username: FarhanKhan7828)'))
        else:
            self.stdout.write(self.style.SUCCESS('Updated admin user credentials'))

        # Clear existing projects for clean seed
        Project.objects.all().delete()

        # Project 1: Flipkart Sales & Customer Analysis
        p1 = Project.objects.create(
            title='Flipkart Sales & Customer Analysis',
            subtitle='Customer segmentation, margin gap analysis, and cross-selling strategy on retail transactions',
            category='Retail & E-Commerce',
            summary='Analyzed a large retail sales dataset using SQL, Python, and Power BI to identify high-value customer tiers, evaluate discount elasticity, and uncover cross-category purchasing patterns.',
            key_insight='Segmented ~3,900 customers into Loyal, Discount-Only, and Casual tiers; discovered a $15.36 per-transaction margin gap and profiled 494 high-value organic customers with 33.7 average repeat purchases.',
            tools=['SQL', 'Python', 'Pandas', 'Power BI', 'Exploratory Data Analysis', 'Customer Segmentation'],
            cover_image_url='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
            featured=True,
            order=1
        )

        blocks_p1 = [
            {
                'block_type': 'heading',
                'heading': '1. Business Problem & Analytical Objectives',
                'order': 1
            },
            {
                'block_type': 'text',
                'content': 'E-commerce retailers frequently struggle with margin erosion caused by blanket discounts and customer churn. The primary objective was to answer key strategic questions:\n- Which customer segments generate sustainable lifetime value?\n- Where does margin leakage occur across discounted transactions?\n- What product categories exhibit natural cross-selling affinity for recommendation systems?',
                'order': 2
            },
            {
                'block_type': 'heading',
                'heading': '2. Dataset Architecture & SQL Data Preparation',
                'order': 3
            },
            {
                'block_type': 'text',
                'content': 'The transactional database captured multi-table relational data including Orders, Customers, Products, Categories, Cities, Selling Prices, Discount Values, and Procurement Quantities. SQL Window Functions, CTEs, and aggregations were used to calculate RFM (Recency, Frequency, Monetary) metrics and margin contributions.',
                'order': 4
            },
            {
                'block_type': 'metric',
                'metric_value': '3,900+',
                'metric_label': 'Customers Segmented into Behavioral Tiers',
                'content': 'Classified across Loyal, Discount-Only, and Casual tiers using SQL ranking and NTILE distributions.',
                'order': 5
            },
            {
                'block_type': 'metric',
                'metric_value': '$15.36',
                'metric_label': 'Per-Transaction Margin Gap Discovered',
                'content': 'Identified substantial unit economic leakage on heavy promotional items compared to organic purchases.',
                'order': 6
            },
            {
                'block_type': 'metric',
                'metric_value': '494',
                'metric_label': 'High-Value Organic Customers Profiled',
                'content': 'Averaged $82.32 spend per order with 33.7 repeat lifetime transactions without promotional dependency.',
                'order': 7
            },
            {
                'block_type': 'heading',
                'heading': '3. Analytical Insights & Cross-Selling Patterns',
                'order': 8
            },
            {
                'block_type': 'text',
                'content': 'Exploratory data analysis revealed that revenue was heavily concentrated among the top 12.6% of customer accounts. Furthermore, cross-selling analysis demonstrated high affinity between primary electronics and high-margin accessories, presenting an immediate opportunity for automated basket bundling.',
                'order': 9
            },
            {
                'block_type': 'heading',
                'heading': '4. Strategic Business Recommendations',
                'order': 10
            },
            {
                'block_type': 'text',
                'content': '1. **Tiered Retention Campaigns**: Shift marketing spend away from universal discounting toward personalized loyalty perks for the 494 high-value organic customers.\n2. **Margin Gap Recovery**: Restructure promotional thresholds to eliminate transactions with a margin deficit greater than $15.36.\n3. **Cross-Selling Bundles**: Implement recommendation triggers on checkout pages pairing core products with complementary high-margin accessories.',
                'order': 11
            }
        ]

        for block_data in blocks_p1:
            ProjectBlock.objects.create(project=p1, **block_data)

        # Project 2: Ostwal Industrial Production & Inventory Optimization
        p2 = Project.objects.create(
            title='Industrial Production & Inventory Analysis',
            subtitle='Operational data cleaning, validation, and pattern discovery across manufacturing records',
            category='Operations & Supply Chain',
            summary='Cleaned, audited, and performed exploratory data analysis on 8,000+ manufacturing and inventory records at Ostwal Group of Industries to identify throughput patterns and operational opportunities.',
            key_insight='Validated 8,000+ structured operational records, eliminating discrepancies and creating reliable reporting benchmarks for plant supervisors.',
            tools=['SQL', 'Python', 'Excel', 'Data Validation', 'Data Cleaning', 'KPI Analysis'],
            cover_image_url='https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
            featured=True,
            order=2
        )

        blocks_p2 = [
            {
                'block_type': 'heading',
                'heading': '1. Operational Background',
                'order': 1
            },
            {
                'block_type': 'text',
                'content': 'At Ostwal Group of Industries, production logs and facility inventory tracking required systematic validation to eliminate duplicate reporting and supply bottlenecks across manufacturing units.',
                'order': 2
            },
            {
                'block_type': 'metric',
                'metric_value': '8,000+',
                'metric_label': 'Production & Inventory Records Validated',
                'content': 'Audited multi-departmental logs to verify unit counts, batch numbers, and timestamps.',
                'order': 3
            },
            {
                'block_type': 'heading',
                'heading': '2. Data Cleaning & Exploratory Analysis',
                'order': 4
            },
            {
                'block_type': 'text',
                'content': 'Developed Python and Excel data cleansing scripts to reconcile discrepancies in structured business datasets, identify production cycle delays, and standardize reporting formats for leadership review.',
                'order': 5
            },
            {
                'block_type': 'heading',
                'heading': '3. Business Value Delivered',
                'order': 6
            },
            {
                'block_type': 'text',
                'content': 'Standardized data pipeline reduced inventory auditing errors and provided managers with actionable visibility into material utilization and batch schedules.',
                'order': 7
            }
        ]

        for block_data in blocks_p2:
            ProjectBlock.objects.create(project=p2, **block_data)

        # Project 3: ISTE Digital Engagement & Member Analytics
        p3 = Project.objects.create(
            title='Member Analytics & Digital Growth Platform',
            subtitle='Database operations for 450+ members and web analytics driving +28% session duration',
            category='Product & Web Analytics',
            summary='Managed member datasets and analyzed traffic engagement trends using Google Analytics, Excel, and Power BI to support 20+ technical events at ISTE MITS Gwalior.',
            key_insight='Maintained ~99% data accuracy across 500+ student records and increased average web session duration by 28% through data-driven user flow optimization.',
            tools=['Google Analytics', 'Power BI', 'Excel', 'Data Cleaning', 'Dashboard Development', 'SQL'],
            cover_image_url='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
            featured=True,
            order=3
        )

        blocks_p3 = [
            {
                'block_type': 'heading',
                'heading': '1. Organizational Objective',
                'order': 1
            },
            {
                'block_type': 'text',
                'content': 'ISTE MITS Gwalior organizes technical conferences, workshops, and hackathons. The objective was to maintain clean relational data for 450+ active members and evaluate digital engagement to boost attendance across 20+ events.',
                'order': 2
            },
            {
                'block_type': 'metric',
                'metric_value': '+28%',
                'metric_label': 'Average Web Session Duration Increase',
                'content': 'Driven by identifying high-dropoff landing pages and improving content navigation.',
                'order': 3
            },
            {
                'block_type': 'metric',
                'metric_value': '99%',
                'metric_label': 'Data Accuracy Maintained',
                'content': 'Across 500+ cleaned member records and event registration logs.',
                'order': 4
            },
            {
                'block_type': 'heading',
                'heading': '2. Dashboarding & Analytics Approach',
                'order': 5
            },
            {
                'block_type': 'text',
                'content': 'Analyzed event conversion rates, traffic channels, and attendee retention in Google Analytics. Built monthly Power BI and Excel executive dashboards to provide actionable feedback to event organizers.',
                'order': 6
            }
        ]

        for block_data in blocks_p3:
            ProjectBlock.objects.create(project=p3, **block_data)

        self.stdout.write(self.style.SUCCESS(f'Successfully seeded 3 projects with {ProjectBlock.objects.count()} total dynamic content blocks!'))
