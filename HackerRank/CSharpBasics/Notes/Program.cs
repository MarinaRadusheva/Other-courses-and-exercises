using System;
using System.Collections.Generic;

namespace Solution
{

    public class NotesStore
    {
        private List<Note> notes;
        public NotesStore() 
        {
            notes = new List<Note>();
        }
        public List<Note> Notes { get => this.notes; private set { } }
        public void AddNote(String state, String name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Name cannot be empty");
            }
            if (state=="completed" || state == "active" || state == "others")
            {
                Note newNote = new Note() { Name = name, State = state };
                this.notes.Add(newNote);
            }
            else
            {
                throw new ArgumentException($"Invalid state {state}");
            }
        }
        public List<String> GetNotes(String state)
        {
            if (state == "completed" || state == "active" || state == "others")
            {
                List<string> noteNames = new List<string>();
                for (int i = 0; i < this.Notes.Count; i++)
                {
                    if (Notes[i].State==state)
                    {
                        noteNames.Add(Notes[i].Name);
                    }
                }
                return noteNames;
            }
            else
            {
                throw new ArgumentException($"Invalid state {state}");
            }
        }
    }
    public class Note
    {
        public string State { get; set; }
        public string Name { get; set; }
    }

    public class Solution
    {
        public static void Main()
        {
            var notesStoreObj = new NotesStore();
            var n = int.Parse(Console.ReadLine());
            for (var i = 0; i < n; i++)
            {
                var operationInfo = Console.ReadLine().Split(' ');
                try
                {
                    if (operationInfo[0] == "AddNote")
                        notesStoreObj.AddNote(operationInfo[1], operationInfo.Length == 2 ? "" : operationInfo[2]);
                    else if (operationInfo[0] == "GetNotes")
                    {
                        var result = notesStoreObj.GetNotes(operationInfo[1]);
                        if (result.Count == 0)
                            Console.WriteLine("No Notes");
                        else
                            Console.WriteLine(string.Join(",", result));
                    }
                    else
                    {
                        Console.WriteLine("Invalid Parameter");
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("Error: " + e.Message);
                }
            }
        }
    }
}
