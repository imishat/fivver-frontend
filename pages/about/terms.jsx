import Main from "@/Layout/Main";

const Terms = () => {
  return (
    <Main title={"Terms & Conditions"}>
      <div className="mx-20">
        <div className="px-5 mt-12 py-6">
          <h2 className="text-3xl font-bold text-blue-400">
            Terms & Conditions
          </h2>
        </div>
        <div>
          <ul>
            <li className="list-item list-disc py-3 list">
              You can only use
              our designs for your personal or business purposes.
            </li>
            <li className="list-item list-disc py-3 list">
              You can't resell
              our designs.
            </li>
            <li className="list-item list-disc py-3 list">
              We don't provide
              any photos. You must provide us with the photos for your design.
            </li>
            <li className="list-item list-disc py-3 list">
              We will only
              create the design. We do not print any designs. You have to get
              your design printed from another print shop.
            </li>
            <li className="list-item list-disc py-3 list">
              If you like one
              of our designs, and you want to start a project for this design,
              please take a look at the design description before starting the
              project.
            </li>
            <li className="list-item list-disc py-3 list">
              You will need to
              provide us with your specific information so that we can create
              your design.
            </li>
            <li className="list-item list-disc py-3 list">
              The customer
              must make all changes/revisions before we send the final file, no
              changes/revisions will be accepted after we send the final file.
            </li>
            <li className="list-item list-disc py-3 list">
              If there are any
              errors on our part after sending the final file, we will only
              correct those errors. If there is an error on the part of the
              customer, the customer must start a new project to correct the
              error.
            </li>
            <li className="list-item list-disc py-3 list">
              We don't give
              the customer two options to choose from when creating a new
              design. We only provide one design option. If the customer doesn't
              like the first design, we will create a second design for the
              customer. But we will delete the first design while creating the
              second design. If the customer decides to accept the first design
              after seeing the second design. Then the customer will not get the
              first design from me. And I won't create the first design a second
              time. So if the customer likes the first design, it should be
              accepted immediately.
            </li>
          </ul>
        </div>
        <div className="px-5 mt-12 py-6">
          <h2 className="text-3xl font-bold text-blue-400">
            Refund Policy
          </h2>
        </div>
        <div>
          <ul>
            <li className="list-item list-disc py-3 list">
If you accidentally start a project, you must notify us within 5 hours of starting the project. We will be happy to refund you.
</li>
<li className="list-item list-disc py-3 list">
If you don't like the design we created, you should let us know before we send the final file. Refunds will not be accepted after we have sent the final file.
</li>
<li className="list-item list-disc py-3 list">
After you start a project, we will not provide additional services to you if you ask us for additional services beyond the requirements of the project. You will not be eligible for a refund based on this issue.
            </li>
          </ul>
        </div>
      </div>
    </Main>
  );
};

export default Terms;
