import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/schemaValidations";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";


interface Props {
  params: Promise<{id : string}>;
};


export async function PATCH(request : NextRequest, props: Props) {

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, {status:401});
      
  const params = await props.params;
  const body = await request.json();
  const validation = issueSchema.safeParse(body)

  if (!validation.success)
      return NextResponse.json(validation.error.format(), {status:400})

  const issue = await prisma.issue.findUnique({
      where : {id : parseInt(params.id)}
  })

  if (!issue) 
      return NextResponse.json({error: 'Invalid Issue'}, {status:404});


  const updatedIssue = await prisma.issue.update({
      where: {
        id: issue.id
      },
      data: {
        title: body.title,
        description: body.description,
      },
    });


  return NextResponse.json(updatedIssue)
}

export async function DELETE(request : NextRequest, props: Props) {
  
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, {status:401});

  const params = await props.params;
  const issue = await prisma.issue.findUnique({
      where : {id : parseInt(params.id)}
  })

  if (!issue) 
      return NextResponse.json({error: 'Invalid Issue or Not Found'}, {status:404});

  const updatedIssue = await prisma.issue.delete({
      where: {
        id: issue.id
      }
    });

  return NextResponse.json(updatedIssue)
}