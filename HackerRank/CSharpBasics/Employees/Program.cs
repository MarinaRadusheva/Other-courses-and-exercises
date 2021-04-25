using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Solution
{
    public class Solution
    {

        public static Dictionary<string, int> AverageAgeForEachCompany(List<Employee> employees)
        {
            Dictionary<string, int> companies = new Dictionary<string, int>();
            SortedDictionary<string, List<int>> ages = new SortedDictionary<string, List<int>>();
            foreach (var empl in employees)
            {
                if (ages.ContainsKey(empl.Company))
                {
                    ages[empl.Company].Add(empl.Age);
                }
                else
                {
                    ages.Add(empl.Company, new List<int>() { empl.Age });
                }
            }
            foreach (var comp in ages)
            {
                companies.Add(comp.Key, (int)Math.Round(comp.Value.Average(x => x)));
            }
            return companies;
        }

        public static Dictionary<string, int> CountOfEmployeesForEachCompany(List<Employee> employees)
        {
            SortedDictionary<string, int> empl = new SortedDictionary<string, int>();
            foreach (var item in employees)
            {
                if (empl.ContainsKey(item.Company))
                {
                    empl[item.Company]++;
                }
                else
                {
                    empl.Add(item.Company, 1);
                }
            }
            Dictionary<string, int> result = new Dictionary<string, int>();
            foreach (var com in empl)
            {
                result.Add(com.Key, com.Value);
            }
            return result;
        }

        public static Dictionary<string, Employee> OldestAgeForEachCompany(List<Employee> employees)
        {
            SortedDictionary<string, Employee> empl = new SortedDictionary<string, Employee>();
            foreach (var item in employees)
            {
                if (empl.ContainsKey(item.Company))
                {
                    if (item.Age>empl[item.Company].Age)
                    {
                        empl[item.Company] = item;
                    }
                }
                else
                {
                    empl.Add(item.Company, item);
                }
            }
            Dictionary<string, Employee> result = new Dictionary<string, Employee>();
            foreach (var sth in empl)

            {
                result.Add(sth.Key, sth.Value);
            }
            return result;
        }

        public static void Main()
        {
            int countOfEmployees = int.Parse(Console.ReadLine());

            var employees = new List<Employee>();

            for (int i = 0; i < countOfEmployees; i++)
            {
                string str = Console.ReadLine();
                string[] strArr = str.Split(' ');
                employees.Add(new Employee
                {
                    FirstName = strArr[0],
                    LastName = strArr[1],
                    Company = strArr[2],
                    Age = int.Parse(strArr[3])
                });
            }

            foreach (var emp in AverageAgeForEachCompany(employees))
            {
                Console.WriteLine($"The average age for company {emp.Key} is {emp.Value}");
            }

            foreach (var emp in CountOfEmployeesForEachCompany(employees))
            {
                Console.WriteLine($"The count of employees for company {emp.Key} is {emp.Value}");
            }

            foreach (var emp in OldestAgeForEachCompany(employees))
            {
                Console.WriteLine($"The oldest employee of company {emp.Key} is {emp.Value.FirstName} {emp.Value.LastName} having age {emp.Value.Age}");
            }
        }
    }

    public class Employee
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Company { get; set; }
    }
}
