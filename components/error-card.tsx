import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function ErrorCard({ title, message }: { title: string; message: string }) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[400px] text-center">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>{message}</CardContent>
        </Card>
      </div>
    );
  }
