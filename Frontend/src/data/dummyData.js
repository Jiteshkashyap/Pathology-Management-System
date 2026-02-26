export const doctors = [
  { id: 1, name: "Dr. Sharma", specialization: "Cardiologist", phone: "9876543210" },
  { id: 2, name: "Dr. Khan", specialization: "Neurologist", phone: "9123456780" }
];

export const tests = [
  { id: 1, name: "Hemoglobin", normalRange: "13-17 g/dL", price: 300 },
  { id: 2, name: "Blood Sugar", normalRange: "70-110 mg/dL", price: 200 }
];

export const packages = [
  { id: 1, name: "Basic Health Checkup", tests: 2, discount: 10, price: 450 }
];

export const reports = [
  { id: 101, patient: "Rahul Verma", doctor: "Dr. Sharma", status: "Normal" },
  { id: 102, patient: "Aman Gupta", doctor: "Dr. Khan", status: "High" }
];