import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.specialty.deleteMany();
  await prisma.hospital.deleteMany();

  await prisma.hospital.create({
    data: {
      name: "Shaukat Khanum Memorial Cancer Hospital & Research Centre",
      type: "private",
      address: "7A Block R-3, M.A. Johar Town, Lahore",
      area: "Johar Town",
      lat: 31.4697,
      lng: 74.2728,
      phone: "+92-42-35945100",
      emergency: true,
      beds: 195,
      rating: 4.9,
      timings: "24/7",
      established: 1994,
      specialties: {
        create: [
          { name: "Oncology", rating: 5.0 },
          { name: "Radiology", rating: 4.8 },
          { name: "General Surgery", rating: 4.7 },
          { name: "Pathology", rating: 4.9 },
          { name: "Palliative Care", rating: 4.8 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Services Hospital Lahore",
      type: "public",
      address: "Jail Road, Lahore",
      area: "Shadman",
      lat: 31.5477,
      lng: 74.3195,
      phone: "+92-42-99203337",
      emergency: true,
      beds: 1500,
      rating: 3.4,
      timings: "24/7",
      established: 1962,
      specialties: {
        create: [
          { name: "Emergency Medicine", rating: 3.5 },
          { name: "General Surgery", rating: 3.4 },
          { name: "Orthopedics", rating: 3.3 },
          { name: "Gynecology", rating: 3.4 },
          { name: "Neurology", rating: 3.2 },
          { name: "Cardiology", rating: 3.5 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Mayo Hospital (General Hospital Lahore)",
      type: "public",
      address: "Nila Gumbad, Anarkali, Lahore",
      area: "Mall Road",
      lat: 31.5663,
      lng: 74.3155,
      phone: "+92-42-99211088",
      emergency: true,
      beds: 2000,
      rating: 3.2,
      timings: "24/7",
      established: 1871,
      specialties: {
        create: [
          { name: "Emergency Medicine", rating: 3.3 },
          { name: "General Surgery", rating: 3.2 },
          { name: "Dermatology", rating: 3.1 },
          { name: "ENT", rating: 3.3 },
          { name: "Psychiatry", rating: 3.0 },
          { name: "Nephrology", rating: 3.2 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Jinnah Hospital Lahore",
      type: "public",
      address: "Allama Shabbir Ahmad Usmani Road, Lahore",
      area: "Gulberg",
      lat: 31.5074,
      lng: 74.3209,
      phone: "+92-42-99231301",
      emergency: true,
      beds: 1800,
      rating: 3.3,
      timings: "24/7",
      established: 1978,
      specialties: {
        create: [
          { name: "Cardiology", rating: 3.5 },
          { name: "Neurology", rating: 3.3 },
          { name: "Orthopedics", rating: 3.2 },
          { name: "Gynecology", rating: 3.4 },
          { name: "Emergency Medicine", rating: 3.6 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Aga Khan Health Service Clinic Lahore",
      type: "private",
      address: "Block N, Model Town, Lahore",
      area: "Model Town",
      lat: 31.4818,
      lng: 74.3264,
      phone: "+92-42-35168000",
      emergency: false,
      beds: 120,
      rating: 4.4,
      timings: "8:00 AM - 10:00 PM",
      established: 2005,
      specialties: {
        create: [
          { name: "General Medicine", rating: 4.5 },
          { name: "Pediatrics", rating: 4.4 },
          { name: "Gynecology", rating: 4.3 },
          { name: "Ophthalmology", rating: 4.4 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Hameed Latif Hospital",
      type: "private",
      address: "1 Abu Bakar Block, New Garden Town, Lahore",
      area: "Garden Town",
      lat: 31.5004,
      lng: 74.3104,
      phone: "+92-42-35761999",
      emergency: true,
      beds: 200,
      rating: 4.3,
      timings: "24/7",
      established: 1990,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.5 },
          { name: "General Surgery", rating: 4.3 },
          { name: "Orthopedics", rating: 4.2 },
          { name: "Nephrology", rating: 4.4 },
          { name: "Urology", rating: 4.3 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Doctors Hospital & Medical Centre",
      type: "private",
      address: "152-G/1, Canal Bank Road, Johar Town, Lahore",
      area: "Johar Town",
      lat: 31.4724,
      lng: 74.2973,
      phone: "+92-42-35302401",
      emergency: true,
      beds: 300,
      rating: 4.6,
      timings: "24/7",
      established: 1995,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.7 },
          { name: "Neurology", rating: 4.5 },
          { name: "General Surgery", rating: 4.6 },
          { name: "Orthopedics", rating: 4.5 },
          { name: "Gastroenterology", rating: 4.6 },
          { name: "Oncology", rating: 4.4 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Ittefaq Hospital",
      type: "private",
      address: "Canal Park, Gulberg III, Lahore",
      area: "Gulberg",
      lat: 31.5218,
      lng: 74.3519,
      phone: "+92-42-35761234",
      emergency: true,
      beds: 250,
      rating: 4.4,
      timings: "24/7",
      established: 1985,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.5 },
          { name: "General Surgery", rating: 4.4 },
          { name: "Orthopedics", rating: 4.3 },
          { name: "Gynecology", rating: 4.4 },
          { name: "Pediatrics", rating: 4.3 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Lahore Care Hospital",
      type: "private",
      address: "Main Boulevard, Gulberg III, Lahore",
      area: "Gulberg",
      lat: 31.5261,
      lng: 74.3563,
      phone: "+92-42-35761800",
      emergency: true,
      beds: 150,
      rating: 4.2,
      timings: "24/7",
      established: 2002,
      specialties: {
        create: [
          { name: "General Medicine", rating: 4.2 },
          { name: "Gynecology", rating: 4.3 },
          { name: "Pediatrics", rating: 4.1 },
          { name: "Dermatology", rating: 4.2 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "National Hospital & Medical Centre",
      type: "private",
      address: "132/3, Lake Road, Lahore",
      area: "DHA",
      lat: 31.4677,
      lng: 74.4023,
      phone: "+92-42-35692000",
      emergency: true,
      beds: 180,
      rating: 4.5,
      timings: "24/7",
      established: 1993,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.6 },
          { name: "Neurosurgery", rating: 4.5 },
          { name: "Orthopedics", rating: 4.4 },
          { name: "Urology", rating: 4.5 },
          { name: "ENT", rating: 4.4 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Farooq Hospital",
      type: "private",
      address: "Westwood Colony, Township, Lahore",
      area: "Township",
      lat: 31.4952,
      lng: 74.2813,
      phone: "+92-42-35161234",
      emergency: true,
      beds: 160,
      rating: 4.1,
      timings: "24/7",
      established: 1998,
      specialties: {
        create: [
          { name: "General Surgery", rating: 4.2 },
          { name: "Gynecology", rating: 4.1 },
          { name: "Orthopedics", rating: 4.0 },
          { name: "Pediatrics", rating: 4.1 },
          { name: "Emergency Medicine", rating: 4.2 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Shaikh Zayed Hospital Lahore",
      type: "public",
      address: "University Avenue, New Muslim Town, Lahore",
      area: "Model Town",
      lat: 31.5003,
      lng: 74.3236,
      phone: "+92-42-99231621",
      emergency: true,
      beds: 700,
      rating: 3.6,
      timings: "24/7",
      established: 1987,
      specialties: {
        create: [
          { name: "Cardiology", rating: 3.8 },
          { name: "Nephrology", rating: 3.7 },
          { name: "Neurology", rating: 3.5 },
          { name: "General Surgery", rating: 3.6 },
          { name: "Gastroenterology", rating: 3.6 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Life Care Hospital Lahore",
      type: "private",
      address: "22-C, Ali Block, New Garden Town, Lahore",
      area: "Garden Town",
      lat: 31.4979,
      lng: 74.3088,
      phone: "+92-42-35851234",
      emergency: false,
      beds: 100,
      rating: 4.0,
      timings: "8:00 AM - 11:00 PM",
      established: 2008,
      specialties: {
        create: [
          { name: "General Medicine", rating: 4.0 },
          { name: "Gynecology", rating: 4.1 },
          { name: "Dermatology", rating: 3.9 },
          { name: "Ophthalmology", rating: 4.0 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Ghurki Trust Teaching Hospital",
      type: "private",
      address: "Jallo More, GT Road, Lahore",
      area: "Shahdara",
      lat: 31.6034,
      lng: 74.4341,
      phone: "+92-42-36540012",
      emergency: true,
      beds: 450,
      rating: 4.0,
      timings: "24/7",
      established: 1997,
      specialties: {
        create: [
          { name: "Orthopedics", rating: 4.2 },
          { name: "General Surgery", rating: 4.0 },
          { name: "Cardiology", rating: 3.9 },
          { name: "Neurology", rating: 3.9 },
          { name: "Gynecology", rating: 4.0 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Avicenna Medical College & Hospital",
      type: "private",
      address: "1-KM Raiwind Road, Lahore",
      area: "Raiwind Road",
      lat: 31.4421,
      lng: 74.3201,
      phone: "+92-42-37802000",
      emergency: true,
      beds: 300,
      rating: 4.1,
      timings: "24/7",
      established: 2004,
      specialties: {
        create: [
          { name: "General Medicine", rating: 4.2 },
          { name: "Pediatrics", rating: 4.0 },
          { name: "Gynecology", rating: 4.1 },
          { name: "General Surgery", rating: 4.0 },
          { name: "Radiology", rating: 4.1 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Omar Hospital & Cardiac Centre",
      type: "private",
      address: "Jail Road, Gulberg V, Lahore",
      area: "Gulberg",
      lat: 31.5191,
      lng: 74.3302,
      phone: "+92-42-35761501",
      emergency: true,
      beds: 175,
      rating: 4.3,
      timings: "24/7",
      established: 1992,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.6 },
          { name: "Cardiac Surgery", rating: 4.5 },
          { name: "General Medicine", rating: 4.2 },
          { name: "Emergency Medicine", rating: 4.3 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Al-Razi Healthcare",
      type: "private",
      address: "116-C-II, Gulberg III, Lahore",
      area: "Gulberg",
      lat: 31.5244,
      lng: 74.3487,
      phone: "+92-42-35761199",
      emergency: false,
      beds: 110,
      rating: 4.2,
      timings: "8:00 AM - 10:00 PM",
      established: 2001,
      specialties: {
        create: [
          { name: "General Medicine", rating: 4.3 },
          { name: "Dermatology", rating: 4.2 },
          { name: "ENT", rating: 4.1 },
          { name: "Ophthalmology", rating: 4.2 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Surgimed Hospital",
      type: "private",
      address: "1-Zafar Ali Road, Gulberg V, Lahore",
      area: "Gulberg",
      lat: 31.5171,
      lng: 74.3384,
      phone: "+92-42-35763600",
      emergency: true,
      beds: 140,
      rating: 4.4,
      timings: "24/7",
      established: 1999,
      specialties: {
        create: [
          { name: "General Surgery", rating: 4.5 },
          { name: "Orthopedics", rating: 4.4 },
          { name: "Urology", rating: 4.3 },
          { name: "Laparoscopic Surgery", rating: 4.5 },
          { name: "Neurosurgery", rating: 4.3 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Fatima Memorial Hospital",
      type: "semi-government",
      address: "Shadman II, Lahore",
      area: "Shadman",
      lat: 31.5441,
      lng: 74.3171,
      phone: "+92-42-37501231",
      emergency: true,
      beds: 400,
      rating: 3.9,
      timings: "24/7",
      established: 1969,
      specialties: {
        create: [
          { name: "Gynecology", rating: 4.0 },
          { name: "Pediatrics", rating: 3.9 },
          { name: "General Surgery", rating: 3.8 },
          { name: "Emergency Medicine", rating: 4.0 },
          { name: "Cardiology", rating: 3.8 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Armed Forces Institute of Cardiology (AFIC) Lahore",
      type: "semi-government",
      address: "Abid Majeed Road, Lahore Cantt, Lahore",
      area: "Cantt",
      lat: 31.5504,
      lng: 74.3828,
      phone: "+92-42-36619541",
      emergency: true,
      beds: 350,
      rating: 4.6,
      timings: "24/7",
      established: 1993,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.8 },
          { name: "Cardiac Surgery", rating: 4.7 },
          { name: "Vascular Surgery", rating: 4.6 },
          { name: "Radiology", rating: 4.5 },
          { name: "Emergency Medicine", rating: 4.6 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Sheikh Khalifa Bin Zayed Al-Nahyan Hospital",
      type: "public",
      address: "Ferozepur Road, Lahore",
      area: "Faisal Town",
      lat: 31.4913,
      lng: 74.3014,
      phone: "+92-42-99333001",
      emergency: true,
      beds: 500,
      rating: 3.5,
      timings: "24/7",
      established: 2008,
      specialties: {
        create: [
          { name: "General Medicine", rating: 3.6 },
          { name: "General Surgery", rating: 3.5 },
          { name: "Orthopedics", rating: 3.4 },
          { name: "Gynecology", rating: 3.6 },
          { name: "Pediatrics", rating: 3.5 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Pak Emirates Military Hospital (PEMH)",
      type: "semi-government",
      address: "Rawal Road, Rawalpindi — Lahore Cantt Branch, Lahore",
      area: "Cantt",
      lat: 31.5559,
      lng: 74.3901,
      phone: "+92-42-36619800",
      emergency: true,
      beds: 600,
      rating: 4.2,
      timings: "24/7",
      established: 1998,
      specialties: {
        create: [
          { name: "Orthopedics", rating: 4.4 },
          { name: "General Surgery", rating: 4.2 },
          { name: "Neurology", rating: 4.1 },
          { name: "Cardiology", rating: 4.3 },
          { name: "Emergency Medicine", rating: 4.2 },
          { name: "Radiology", rating: 4.0 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Chaudhry Hospital Lahore",
      type: "private",
      address: "Garden Block, New Garden Town, Lahore",
      area: "Garden Town",
      lat: 31.5017,
      lng: 74.3142,
      phone: "+92-42-35762100",
      emergency: true,
      beds: 130,
      rating: 4.1,
      timings: "24/7",
      established: 2003,
      specialties: {
        create: [
          { name: "General Surgery", rating: 4.1 },
          { name: "Gynecology", rating: 4.2 },
          { name: "Pediatrics", rating: 4.0 },
          { name: "Emergency Medicine", rating: 4.1 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Punjab Institute of Cardiology (PIC)",
      type: "public",
      address: "Jail Road, Lahore",
      area: "Shadman",
      lat: 31.5462,
      lng: 74.3226,
      phone: "+92-42-99202611",
      emergency: true,
      beds: 300,
      rating: 3.8,
      timings: "24/7",
      established: 1994,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.0 },
          { name: "Cardiac Surgery", rating: 3.9 },
          { name: "Vascular Surgery", rating: 3.7 },
          { name: "Emergency Medicine", rating: 3.8 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Lady Willingdon Hospital",
      type: "public",
      address: "Fatima Jinnah Road, Lahore",
      area: "Mall Road",
      lat: 31.5614,
      lng: 74.3163,
      phone: "+92-42-99211022",
      emergency: true,
      beds: 600,
      rating: 3.3,
      timings: "24/7",
      established: 1929,
      specialties: {
        create: [
          { name: "Gynecology", rating: 3.5 },
          { name: "Obstetrics", rating: 3.4 },
          { name: "Pediatrics", rating: 3.3 },
          { name: "Neonatology", rating: 3.2 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Children's Hospital Lahore",
      type: "public",
      address: "Ferozepur Road, Lahore",
      area: "Faisal Town",
      lat: 31.4940,
      lng: 74.2956,
      phone: "+92-42-99334000",
      emergency: true,
      beds: 900,
      rating: 3.6,
      timings: "24/7",
      established: 1972,
      specialties: {
        create: [
          { name: "Pediatrics", rating: 3.8 },
          { name: "Pediatric Surgery", rating: 3.7 },
          { name: "Neonatology", rating: 3.6 },
          { name: "Pediatric Neurology", rating: 3.5 },
          { name: "Emergency Medicine", rating: 3.7 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Sir Ganga Ram Hospital",
      type: "public",
      address: "Jail Road, Shadman, Lahore",
      area: "Shadman",
      lat: 31.5498,
      lng: 74.3254,
      phone: "+92-42-99203660",
      emergency: true,
      beds: 700,
      rating: 3.4,
      timings: "24/7",
      established: 1921,
      specialties: {
        create: [
          { name: "General Surgery", rating: 3.5 },
          { name: "Orthopedics", rating: 3.4 },
          { name: "ENT", rating: 3.3 },
          { name: "Ophthalmology", rating: 3.4 },
          { name: "Dermatology", rating: 3.2 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Choudhry Hospital Faisalabad Road",
      type: "private",
      address: "Faisalabad Road, Shahdara, Lahore",
      area: "Shahdara",
      lat: 31.6101,
      lng: 74.3897,
      phone: "+92-42-37941234",
      emergency: true,
      beds: 140,
      rating: 4.0,
      timings: "24/7",
      established: 2006,
      specialties: {
        create: [
          { name: "General Surgery", rating: 4.1 },
          { name: "Gynecology", rating: 4.0 },
          { name: "Emergency Medicine", rating: 4.0 },
          { name: "Orthopedics", rating: 3.9 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Humboldt Hospital Lahore",
      type: "private",
      address: "Phase 5, DHA, Lahore",
      area: "DHA",
      lat: 31.4744,
      lng: 74.3927,
      phone: "+92-42-35694400",
      emergency: true,
      beds: 160,
      rating: 4.3,
      timings: "24/7",
      established: 2010,
      specialties: {
        create: [
          { name: "General Medicine", rating: 4.4 },
          { name: "Gastroenterology", rating: 4.3 },
          { name: "Urology", rating: 4.3 },
          { name: "Dermatology", rating: 4.2 },
          { name: "Psychiatry", rating: 4.1 },
        ],
      },
    },
  });

  await prisma.hospital.create({
    data: {
      name: "Bahria International Hospital Lahore",
      type: "private",
      address: "Takbeer Block, Sector B, Bahria Town, Lahore",
      area: "Bahria Town",
      lat: 31.3788,
      lng: 74.1932,
      phone: "+92-42-35402000",
      emergency: true,
      beds: 250,
      rating: 4.5,
      timings: "24/7",
      established: 2012,
      specialties: {
        create: [
          { name: "Cardiology", rating: 4.6 },
          { name: "Oncology", rating: 4.4 },
          { name: "Orthopedics", rating: 4.5 },
          { name: "Neurology", rating: 4.4 },
          { name: "Gynecology", rating: 4.5 },
          { name: "Emergency Medicine", rating: 4.6 },
        ],
      },
    },
  });

  console.log("Seed completed: 30 hospitals with specialties inserted.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
